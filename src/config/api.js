// 새 뉴스 학습 백엔드 API 설정
const isDevelopment = process.env.NODE_ENV === 'development';
export const API_BASE_URL = isDevelopment
  ? 'http://localhost:3001/api'
  : 'https://your-deployed-server.example.com/api';

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  newsRandom: `${API_BASE_URL}/news/random`,
  newsSummarize: `${API_BASE_URL}/news/summarize`,
  newsQuiz: `${API_BASE_URL}/news-quiz`,
};