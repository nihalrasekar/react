// CardPageNav.tsx
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TinderCard from './TinderCard';
import SlideAnimation from './SlideAnimation';

const CardPageNav: React.FC = () => {
 const [currentUserIndex, setCurrentUserIndex] = useState(0);
 const [users, setUsers] = useState([]);

 useEffect(() => {
    const fetchData = async () => {
      try {
        // Retrieve the session ID from AsyncStorage
        const sessionId = await AsyncStorage.getItem('sessionId');
        console.log('fetch api ');
        // Make a request to your backend API
        const response = await fetch('http://127.0.0.1:8000//optionsmatches/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionId}`, // Assuming your API uses Bearer token for authentication
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUsers(data.other_users_data); // Assuming the API returns an array of users
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
 }, []);

 const handleSwipeRight = () => {
    console.log('Right swipe, moving to the next user...');
    setCurrentUserIndex((prevIndex) => prevIndex + 1);
 };

 const handleSwipeLeft = () => {
    console.log('Left swipe, moving to the next user...');
    setCurrentUserIndex((prevIndex) => prevIndex + 1);
 };

 const currentUser = users[currentUserIndex];

 return (
    <View style={styles.container}>
      {currentUser && (
        <SlideAnimation
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        >
          <TinderCard user={currentUser} />
        </SlideAnimation>
      )}
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: 'white',
 },
});

export default CardPageNav;
