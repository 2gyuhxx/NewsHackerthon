// 구 앱 설정은 폐기하고, 새 API 주소만 관리합니다.
export const API_URL = __DEV__ ? 'http://localhost:3001' : 'https://your-deployed-server.example.com';
export default { API_URL };