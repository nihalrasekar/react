import  React,{useState,useEffect} from 'react';
import { View, Text , ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import ProfileScreen from './pages/ProfileScreen';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';






const Stack = createNativeStackNavigator();

function App() {
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
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />

          </Stack.Navigator>
        ) : (
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}

export default App;
