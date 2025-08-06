import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const QuizScreen = ({ route }) => {
  const { category } = route.params;
  const [news, setNews] = useState(null);
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Fetch news and generate quiz based on the category
    // This is a placeholder for the actual API call
    setNews({
      title: '뉴스 제목',
      source: '출처',
      summary: '기사 요약 (3~5줄)...',
    });
    setQuiz([
      { id: 1, type: 'fact-opinion', question: '이 문장은 사실인가, 의견인가?', options: ['사실', '의견'], answer: '의견' },
      { id: 2, type: 'logical-fallacy', question: '이 기사에서 발견되는 논리적 오류는?', options: ['성급한 일반화', '인과관계의 오류'], answer: '성급한 일반화' },
      { id: 3, type: 'sentiment', question: '이 기사의 논조는?', options: ['긍정', '부정', '중립'], answer: '중립' },
    ]);
  }, [category]);

  if (!news || !quiz) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{news.title}</Text>
      <Text style={styles.source}>{news.source}</Text>
      <Text style={styles.summary}>{news.summary}</Text>
      
      {quiz.map((q) => (
        <View key={q.id} style={styles.questionContainer}>
          <Text style={styles.question}>{q.question}</Text>
          {/* Render options and handle answers here */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  source: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 15,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QuizScreen;
