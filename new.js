import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { ActivityIndicator, View , Text} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Cardpage from './pages/CardPage';

const DetailsScreen = () => {
  const [sessionExists, setSessionExists] = useState<boolean | null>(null); // Adjusted type to boolean | null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const sessionId = await AsyncStorage.getItem('sessionId');
        if (sessionId) {
          setSessionExists(true);
        } else {
          setSessionExists(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setSessionExists(false);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
      <NavigationContainer>
        {sessionExists ? (
          <Stack.Navigator>
            <Stack.Screen name="Cardpage" component={HomePage} options={{ headerShown: false }} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
  );
};
function DetailsScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }
export default DetailsScreen;

