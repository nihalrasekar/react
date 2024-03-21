import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

// Define a type for the user object
interface User {
  profilePicture: string;
  name: string;
  age: number;
  email: string;
  languages: string[];
  hobbies: string[];
  pictures: string[];
}

const ProfileScreen: React.FC = ({ }) => {
  const user: User = {
    profilePicture: 'https://example.com/profile.jpg',
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    languages: ['English', 'Spanish', 'French'],
    hobbies: ['Reading', 'Traveling', 'Coding'],
    pictures: [
      'https://example.com/pic1.jpg',
      'https://example.com/pic2.jpg',
      'https://example.com/pic3.jpg',
      'https://example.com/pic4.jpg',
      'https://example.com/pic5.jpg',
      'https://example.com/pic6.jpg',
      'https://example.com/pic7.jpg',
      'https://example.com/pic8.jpg',
      'https://example.com/pic9.jpg',
    ],
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('sessionId');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const renderUserInfo = () => (
    <View style={styles.userInfoContainer}>
      <Image source={{ uri: user.profilePicture }} style={styles.profilePicture} />
      <Text style={styles.userInfoText}>{user.name}</Text>
      <Text style={styles.userInfoText}>Age: {user.age}</Text>
      <Text style={styles.userInfoText}>Email: {user.email}</Text>
      <Text style={styles.userInfoText}>Languages: {user.languages.join(', ')}</Text>
      <Text style={styles.userInfoText}>Hobbies: {user.hobbies.join(', ')}</Text>
    </View>
  );

  const renderPictures = () => (
    <FlatList
      data={user.pictures}
      renderItem={({ item }) => (
        <Image source={{ uri: item }} style={styles.picture} />
      )}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
    />
  );

  const renderLogoutButton = () => (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Text style={styles.logoutButtonText}>Logout</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderUserInfo()}
      {renderPictures()}
      {renderLogoutButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userInfoText: {
    marginBottom: 10,
  },
  picture: {
    width: 100,
    height: 100,
    margin: 5,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
