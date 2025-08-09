import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { LogBox, View } from 'react-native';
import Login from './src/screens/login';
import Test from './src/screens/test';
import Home from './src/screens/home';
import Setting from './src/screens/setting';

// LogBox 설정
LogBox.ignoreLogs(['Text strings must be rendered within a <Text> component']);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Lecture') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Credential') {
              iconName = focused ? 'ribbon' : 'ribbon-outline';
            } else if (route.name === 'Company') {
              iconName = focused ? 'business' : 'business-outline';
            }

            return <Ionicons name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: '#2563eb',
          tabBarInactiveTintColor: '#9ca3af',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginBottom: 8,
            paddingBottom: 4,
          },
          tabBarStyle: {
            height: 65,
            paddingBottom: 12,
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: '#e5e7eb',
            backgroundColor: '#fff',
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 5,
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          },
          tabBarBackground: () => (
            <View style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              height: 100,
              backgroundColor: '#fff',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }} />
          ),
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '홈',
          }}
        />
        {/* 필요 시 다른 탭 추가 */}
      </Tab.Navigator>
      <View style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 30,
        backgroundColor: '#fff',
      }} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Stack.Navigator 
          initialRouteName="Login" 
          screenOptions={{
            headerShown: true,
            headerBackTitle: '뒤로',
            headerBackVisible: true,
            gestureEnabled: true,
            cardOverlayEnabled: true,
            animation: 'slide_from_right',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="MainTabs" 
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Test" 
            component={Test}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Setting" 
            component={Setting}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}