import React from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
 ChatList: undefined;
 Chat: { userId: string };
};

type ChatListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ChatList'>;

type Props = {
 navigation: ChatListScreenNavigationProp;
};

interface ChatItem {
 id: string;
 name: string;
 lastMessage: string;
}

const data: ChatItem[] = [
 { id: '1', name: 'John Doe', lastMessage: 'Hey, how are you?' },
 { id: '2', name: 'Jane Doe', lastMessage: 'Check out this cool link!' },
 // Add more users as needed
];

const ChatListScreen: React.FC<Props> = ({ navigation }) => {
 const renderItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Chat', { userId: item.id })}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', height:50 }}>
        <Text>{item.name}</Text>
        <Text>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
 );

 return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
 )
};

export default ChatListScreen;
