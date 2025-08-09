// 뉴스 학습 백엔드
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

let OpenAI;
try { OpenAI = require('openai'); } catch (_) { OpenAI = null; }

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const PORT = process.env.PORT || 3001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const HF_TOKEN = process.env.HF_TOKEN || '';
const BIGKINDS_API_KEY = process.env.BIGKINDS_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'news-learning-backend', time: new Date().toISOString() });
});

const CATEGORY_MAP = { politics: '정치', economy: '경제', society: '사회', culture: '문화' };
function normalizeCategory(cat) {
  if (!cat || cat === 'random') return 'random';
  if (CATEGORY_MAP[cat]) return cat;
  const found = Object.entries(CATEGORY_MAP).find(([, v]) => v === cat);
  return found ? found[0] : 'random';
}

async function fetchRandomNews(categoryKey = 'random') {
  const cat = normalizeCategory(categoryKey);
  if (!BIGKINDS_API_KEY) {
    return {
      title: '소기업·소상공인 소비쿠폰 내수활성화 기대… 채무탕감은 글쎄',
      content:
        '국내 소기업·소상공인 10곳 중 8곳은 민생회복 소비쿠폰으로 내수활성화를 기대하는 것으로 나타났다. 반면 장기연체채권 채무조정에 대해서는 형평성과 도덕적 해이에 대한 우려가 제기되었다.',
      url: 'https://example.com/demo-news',
      provider: '매일신문',
      category: cat === 'random' ? 'economy' : cat,
      publishedAt: new Date().toISOString(),
    };
  }
  try {
    const now = new Date();
    const startDt = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 7)
      .toISOString().slice(0, 10).replace(/-/g, '');
    const endDt = now.toISOString().slice(0, 10).replace(/-/g, '');
    const body = {
      access_key: BIGKINDS_API_KEY,
      argument: {
        query: '',
        published_at: { from: startDt, until: endDt },
        provider: [],
        category: cat === 'random' ? [] : [CATEGORY_MAP[cat]],
        category_incident: [],
        byline: '',
        provider_subject: [],
        subject_info: [],
        news_ids: [],
        analysis: false,
        return_from: 0,
        return_size: 10,
        sort: { date: 'desc' },
      },
    };
    const { data } = await axios.post('https://www.bigkinds.or.kr/api/news/search.do', body, {
      headers: { 'Content-Type': 'application/json' },
    });
    const items = (data?.result?.list || []).map((it) => ({
      title: it?.title || '',
      content: (it?.content || '').replace(/\s+/g, ' ').trim(),
      url: it?.url || it?.news_url || '',
      provider: it?.provider || it?.media_name || '언론사',
      category: cat,
      publishedAt: it?.date || it?.published_at || new Date().toISOString(),
    }));
    if (!items.length) throw new Error('No news');
    return items[Math.floor(Math.random() * items.length)];
  } catch (e) {
    return {
      title: '데모 기사: 내수 활성화 기대와 채무조정 우려',
      content:
        '최근 설문조사에 따르면 내수활성화를 위한 소비쿠폰 정책에는 기대가 높지만, 장기연체채권 채무조정 정책에는 형평성 문제를 우려하는 의견이 많았다.',
      url: 'https://example.com/demo',
      provider: '데모언론',
      category: cat === 'random' ? 'economy' : cat,
      publishedAt: new Date().toISOString(),
    };
  }
}

async function summarize(text) {
  if (!text) return '';
  if (!HF_TOKEN) {
    const sentences = text.split(/(?<=[.!?\u3002\uFF01\uFF1F])/).map((s) => s.trim()).filter(Boolean);
    return sentences.slice(0, 5).join(' ');
  }
  try {
    const { data } = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
      { inputs: text.slice(0, 4500) },
      { headers: { Authorization: `Bearer ${HF_TOKEN}` }, timeout: 30000 }
    );
    const out = Array.isArray(data) && data[0]?.summary_text ? data[0].summary_text : '';
    return out || text.slice(0, 500);
  } catch (_) {
    return text.slice(0, 500);
  }
}

async function openaiClient() {
  if (!OpenAI || !OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: OPENAI_API_KEY });
}

async function moderationCheck(article) {
  const client = await openaiClient();
  if (!client) return { allowed: true, reason: 'no-openai-key' };
  const prompt = `다음 기사에 혐오 표현, 피해자 실명, 특정 지역/집단 비하, 선정적 내용이 있는지 검사.\n없으면 PASS만, 있으면 BLOCK:사유\n제목: ${article.title}\n본문: ${article.content}`;
  const resp = await client.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0,
  });
  const text = resp.choices[0]?.message?.content?.trim() || 'PASS';
  if (text.startsWith('BLOCK')) return { allowed: false, reason: text };
  return { allowed: true, reason: text };
}

async function generateQuiz(article, summary) {
  const client = await openaiClient();
  if (!client) {
    return {
      summary,
      questions: [
        { id: 'q1', type: 'tone', question: '요약의 논조는?', options: ['긍정', '중립', '부정'], answerIndex: 0, explanation: '기대라는 표현은 긍정에 가깝습니다.' },
        { id: 'q2', type: 'fact-opinion', question: '“10곳 중 8곳”은 사실/의견?', options: ['사실', '의견'], answerIndex: 0, explanation: '수치가 있는 조사 결과는 사실.' },
        { id: 'q3', type: 'logic', question: '반대 의견이 더 많으니 정책은 반드시 실패한다 → 타당한가?', options: ['참', '거짓'], answerIndex: 1, explanation: '성급한 일반화 오류.' },
      ],
    };
  }
  const sys = '비판적 사고 퀴즈 생성기. JSON만 출력.';
  const user = `기사 제목: ${article.title}\n기사 요약: ${summary}\nJSON 스키마:\n{ "questions": [ {"id":"q1","type":"tone","question":"...","options":["긍정","중립","부정"],"answerIndex":0,"explanation":"..."}, {"id":"q2","type":"fact-opinion","question":"...","options":["사실","의견"],"answerIndex":0,"explanation":"..."}, {"id":"q3","type":"logic","question":"...","options":["참","거짓"],"answerIndex":1,"explanation":"..."} ] }`;
  const resp = await client.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [{ role: 'system', content: sys }, { role: 'user', content: user }],
    temperature: 0.2,
  });
  const txt = resp.choices[0]?.message?.content || '{}';
  let json; try { json = JSON.parse(txt); } catch { json = { questions: [] }; }
  return { summary, questions: json.questions || [] };
}

app.get('/api/news/random', async (req, res) => {
  const category = req.query.category || 'random';
  const article = await fetchRandomNews(category);
  res.json(article);
});

app.post('/api/news/summarize', async (req, res) => {
  const { content } = req.body || {};
  if (!content) return res.status(400).json({ error: 'content required' });
  const s = await summarize(content);
  res.json({ summary: s });
});

app.get('/api/news-quiz', async (req, res) => {
  try {
    const category = req.query.category || 'random';
    const article = await fetchRandomNews(category);
    const mod = await moderationCheck(article);
    if (!mod.allowed) return res.status(406).json({ error: 'filtered', reason: mod.reason });
    const summary = await summarize(article.content);
    const quiz = await generateQuiz(article, summary);
    res.json({ article, summary: quiz.summary, questions: quiz.questions });
  } catch (e) {
    res.status(500).json({ error: e.message || 'internal-error' });
  }
});

app.listen(PORT, () => {
  console.log(`news-learning backend running on :${PORT}`);
});