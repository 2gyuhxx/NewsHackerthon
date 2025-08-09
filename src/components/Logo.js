import { Text, StyleSheet } from 'react-native';

export default function Logo({ style }) {
  return (
    <Text style={[styles.logo, style]}>This is 참</Text>
  );
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 28,
    color: '#111',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});