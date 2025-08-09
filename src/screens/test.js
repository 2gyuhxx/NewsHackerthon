import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// 퀴즈 진행 화면으로 변경
export default function QuizScreen({ route, navigation }) {
  // 디자인 전용: route.params 없으면 샘플로 렌더
  const { article, summary, questions } = route.params || {
    article: { category: 'economy' },
    summary:
      '국내 소기업·소상공인 10곳 중 8곳은 민생회복 소비쿠폰으로 내수활성화를 기대했다. 반면 장기연체채권 채무조정에는 형평성과 도덕적 해이에 대한 우려가 있었다.',
    questions: [
      { id: 'q1', type: 'tone', question: '요약의 논조는 무엇에 가까운가요?', options: ['긍정', '중립', '부정'], answerIndex: 0, explanation: '“기대했다”는 표현은 긍정적 태도.' },
      { id: 'q2', type: 'fact-opinion', question: '“10곳 중 8곳”은 사실/의견?', options: ['사실', '의견'], answerIndex: 0, explanation: '수치가 있는 조사 결과는 사실.' },
      { id: 'q3', type: 'logic', question: '반대 의견이 더 많으니 정책은 반드시 실패 → 타당?', options: ['참', '거짓'], answerIndex: 1, explanation: '성급한 일반화 오류.' },
    ],
  };
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({}); // { qid: index }
  const q = useMemo(() => questions?.[current], [questions, current]);

  if (!q) {
    return (
      <View style={styles.container}> 
        <Text style={styles.title}>퀴즈를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  const onChoose = (idx) => {
    setSelected((p) => ({ ...p, [q.id]: idx }));
  };

  const isCorrect = selected[q.id] === q.answerIndex;
  const answered = selected[q.id] !== undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.section}>{article?.category?.toUpperCase?.() || 'NEWS'}</Text>
      <Text style={styles.question}>{`Q${current + 1}. ${q.type === 'tone' ? '기사 논조 판단' : q.type === 'fact-opinion' ? '사실과 의견 구분' : '논리적 추론'}`}</Text>
      <Text style={styles.summary}>{summary}</Text>

      <Text style={styles.qtext}>{q.question}</Text>
      <FlatList
        data={q.options}
        keyExtractor={(it, i) => `${q.id}-${i}`}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={[styles.option, selected[q.id] === index && styles.optionSelected]} onPress={() => onChoose(index)}>
            <Text style={[styles.optionText, selected[q.id] === index && styles.optionTextSelected]}>{item}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingVertical: 8 }}
      />

      {answered && (
        <View style={[styles.explainCard, isCorrect ? styles.correct : styles.wrong]}>
          <Ionicons name={isCorrect ? 'checkmark-circle' : 'close-circle'} size={28} color={isCorrect ? '#16a34a' : '#ef4444'} />
          <Text style={styles.explainText}>{isCorrect ? '정답입니다!' : '오답입니다!'}</Text>
          <Text style={styles.explainDesc}>{q.explanation}</Text>
          <TouchableOpacity style={styles.nextBtn} onPress={() => setCurrent((c) => Math.min(c + 1, 2))}>
            <Text style={styles.nextBtnText}>넘어가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20, paddingBottom: 24 },
  section: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  question: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  summary: { backgroundColor: '#f3f4f6', padding: 12, borderRadius: 12, lineHeight: 20, marginBottom: 12 },
  qtext: { fontSize: 16, marginBottom: 8 },
  option: { backgroundColor: '#f3f4f6', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 20, marginBottom: 8 },
  optionSelected: { backgroundColor: '#dbeafe' },
  optionText: { color: '#374151', fontSize: 15 },
  optionTextSelected: { color: '#2563eb', fontWeight: 'bold' },
  explainCard: { backgroundColor: '#fff', borderRadius: 16, borderWidth: 1, borderColor: '#e5e7eb', padding: 16, marginTop: 12 },
  correct: { },
  wrong: { },
  explainText: { fontSize: 18, fontWeight: 'bold', marginTop: 8 },
  explainDesc: { fontSize: 14, color: '#374151', marginTop: 6 },
  nextBtn: { backgroundColor: '#3b3b3b', borderRadius: 10, paddingVertical: 12, marginTop: 12, alignItems: 'center' },
  nextBtnText: { color: '#fff', fontWeight: '600' },
});
