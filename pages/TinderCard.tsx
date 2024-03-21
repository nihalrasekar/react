// TinderCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

interface TinderCardProps {
 user: {
    id: string;
    name: string;
    image: string;
 };
}

const TinderCard: React.FC<TinderCardProps> = ({ user }) => {
  
 return (
    <View style={styles.card}>
      <Image source={{ uri: user.image }} style={styles.image} resizeMode="cover" />
    </View>
 );
};

const styles = StyleSheet.create({
   card: {
      width:'100%',
      height:'100%',
      backgroundColor: 'black',
      padding: 50,
      justifyContent: 'center',
      alignItems: 'center',
   },
   image: {
      width: '100%',
      height: '100%',
      //alignItems:'center',
   },
   name: {
      fontSize: 24,
      marginTop: 10,
      color: 'white', // Ensure the text is visible against the black background
   },
  });
  

export default TinderCard;
