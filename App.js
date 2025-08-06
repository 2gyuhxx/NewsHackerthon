import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '뉴스 퀴즈' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: '퀴즈' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
