import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
// 디자인 전용: API 호출 제거, 샘플 데이터로 퀴즈 화면 이동

const CATEGORIES = [
  { key: 'random', label: '랜덤', icon: 'shuffle' },
  { key: 'politics', label: '정치', icon: 'business' },
  { key: 'economy', label: '경제', icon: 'cash' },
  { key: 'society', label: '사회', icon: 'people' },
  { key: 'culture', label: '문화', icon: 'color-palette' },
];

export default function NewsHome({ navigation }) {
  const [loading, setLoading] = useState(false);

  const startQuiz = async (category) => {
    setLoading(true);
    const article = {
      title: '소기업·소상공인 소비쿠폰 내수활성화 기대… 채무탕감은 글쎄',
      provider: '매일신문',
      category,
    };
    const summary = '국내 소기업·소상공인 10곳 중 8곳은 민생회복 소비쿠폰으로 내수활성화를 기대했다. 반면 장기연체채권 채무조정에는 형평성과 도덕적 해이에 대한 우려가 있었다.';
    const questions = [
      { id: 'q1', type: 'tone', question: '요약의 논조는 무엇에 가까운가요?', options: ['긍정', '중립', '부정'], answerIndex: 0, explanation: '“기대했다”는 표현은 긍정적 태도를 나타냅니다.' },
      { id: 'q2', type: 'fact-opinion', question: '“10곳 중 8곳”은 사실/의견 중 무엇인가요?', options: ['사실', '의견'], answerIndex: 0, explanation: '수치가 있는 조사 결과 → 사실.' },
      { id: 'q3', type: 'logic', question: '반대 의견이 더 많으니 정책은 반드시 실패한다 → 타당한가요?', options: ['참', '거짓'], answerIndex: 1, explanation: '여론만으로 결과를 단정하는 성급한 일반화.' },
    ];
    navigation.navigate('Test', { article, summary, questions });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <Ionicons name="person-circle-outline" size={26} color="#777" />
      </View>
      <Text style={styles.title}>뉴스 분야별 문제</Text>
      {CATEGORIES.map((c) => (
        <TouchableOpacity key={c.key} style={styles.card} onPress={() => startQuiz(c.key)}>
          <Text style={styles.cardTitle}>{c.label}</Text>
          <Ionicons name={c.icon} size={22} color="#777" />
        </TouchableOpacity>
      ))}
      {loading && (
        <View style={{ marginTop: 16 }}>
          <ActivityIndicator size="small" color="#2563eb" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 16, color: '#111', marginBottom: 8, backgroundColor: '#111', color: '#fff', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, borderColor: '#e5e7eb', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#111' },
});
