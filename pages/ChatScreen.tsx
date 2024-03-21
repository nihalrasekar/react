import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Assuming you have a messages array like this
const messages = [
 { id: '1', text: 'Hello!', userId: 'user1' },
 { id: '2', text: 'Hi!', userId: 'user2' },
 { id: '3', text: 'Hello!', userId: 'user1' },
 { id: '4', text: 'Hi!', userId: 'user2' },
 // More messages...
];
interface Message {
    id: string;
    text: string;
    userId: string;
   }
const ChatScreen: React.FC = () => {
 const currentUserId = 'user1'; // This should be dynamically set based on the logged-in user

 const renderMessage = ({ item }: { item: Message }) => {
    const isCurrentUser = item.userId === currentUserId;
    const alignStyle = isCurrentUser ? styles.messageLeft : styles.messageRight;

    return (
      <View style={[styles.messageContainer, alignStyle]}>
        <Text>{item.text}</Text>
      </View>
    );
 };

 return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
      />
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
 },
 messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
 },
 messageLeft: {
    alignSelf: 'flex-start',
    backgroundColor: '#ddd',
 },
 messageRight: {
    alignSelf: 'flex-end',
    backgroundColor: '#007bff',
 },
});

export default ChatScreen;
