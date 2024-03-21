import React from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditPic from './EditPic'; // Assuming you have an EditPic component // Assuming you have an AccountScreen component
import CardPageNav from './CardPage';
import ChatNav from './ChatNav';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const HomePage: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Rizz" component={CardPageNav}  
           
/>
      <Tab.Screen name="EditPic" component={EditPic} />
      <Tab.Screen name="ChatNav" component={ChatNav} options={{ headerShown: false }}/>
      <Tab.Screen name="Account" component={ProfileScreen} />
    </Tab.Navigator>
  );
};




 

export default HomePage;
