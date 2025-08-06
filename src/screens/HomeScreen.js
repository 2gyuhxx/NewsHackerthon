import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>뉴스 분야를 선택하세요</Text>
      <Button
        title="정치"
        onPress={() => navigation.navigate('Quiz', { category: 'politics' })}
      />
      <Button
        title="경제"
        onPress={() => navigation.navigate('Quiz', { category: 'economy' })}
      />
      <Button
        title="사회"
        onPress={() => navigation.navigate('Quiz', { category: 'society' })}
      />
      <Button
        title="랜덤 뉴스"
        onPress={() => navigation.navigate('Quiz', { category: 'random' })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default HomeScreen;
