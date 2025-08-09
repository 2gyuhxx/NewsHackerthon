import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome, AntDesign, FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleContinue = async () => {
    await AsyncStorage.setItem('user_id', email || 'demo@user.com');
    navigation.navigate('MainTabs');
  };

  const SocialButton = ({ icon, color, text, onPress }) => (
    <TouchableOpacity style={styles.socialBtn} onPress={onPress}>
      <View style={styles.socialIconWrap}>{icon}</View>
      <Text style={styles.socialText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.kanji}>眞</Text>
      <Text style={styles.brand}>This is 참</Text>

      <Text style={styles.title}>계정 만들기</Text>
      <Text style={styles.subtitle}>이메일을 입력하여 회원가입 하세요</Text>

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          placeholder="email@domain.com"
          placeholderTextColor="#bdbdbd"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={handleContinue}
        />
      </View>

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          placeholder="비밀번호"
          placeholderTextColor="#bdbdbd"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="done"
          onSubmitEditing={handleContinue}
        />
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.separatorRow}>
        <View style={styles.separator} />
        <Text style={styles.or}>or</Text>
        <View style={styles.separator} />
      </View>

      <SocialButton
        icon={<FontAwesome5 name="comment" size={18} color="#111" />}
        text="카카오톡 계정으로 계속하기"
        onPress={handleContinue}
      />
      <SocialButton
        icon={<FontAwesome name="google" size={18} color="#EA4335" />}
        text="구글 계정으로 계속하기"
        onPress={handleContinue}
      />
      <SocialButton
        icon={<AntDesign name="apple1" size={18} color="#111" />}
        text="애플 계정으로 계속하기"
        onPress={handleContinue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 80 },
  kanji: { fontSize: 96, textAlign: 'center', marginBottom: 8 },
  brand: { textAlign: 'center', fontSize: 20, color: '#333', marginBottom: 24 },
  title: { textAlign: 'center', fontSize: 20, fontWeight: '700', marginBottom: 6 },
  subtitle: { textAlign: 'center', fontSize: 14, color: '#6b7280', marginBottom: 20 },
  inputWrap: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    justifyContent: 'center',
    marginBottom: 12,
  },
  input: { fontSize: 16, color: '#111' },
  continueBtn: {
    backgroundColor: '#111',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  separatorRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginVertical: 24 },
  separator: { flex: 1, height: 1, backgroundColor: '#e5e7eb' },
  or: { color: '#9ca3af', fontSize: 13 },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 12,
  },
  socialIconWrap: { width: 24, alignItems: 'center', marginRight: 12 },
  socialText: { fontSize: 16, color: '#111' },
});