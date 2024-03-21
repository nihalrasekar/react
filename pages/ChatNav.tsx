import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

const ChatNav: React.FC = () => {
 return (
      <Stack.Navigator initialRouteName="ChatList">
        <Stack.Screen name="ChatList" component={ChatListScreen} options={{ title: 'Messages' }} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
 );
};

export default ChatNav;
