import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import PassionsList from './PassionList'; // Import the PassionsList component
import { Picker } from '@react-native-picker/picker';

interface Props {
  navigation: any;
}

const Screen2: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('18'); // Initialize age to 18
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const genders = [
    { id: 'male', name: 'Male' },
    { id: 'female', name: 'Female' }
  ];

  const selectGender = (gender: string) => {
    setSelectedGender(gender);
  };

  const handleSubmit = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!age) {
      Alert.alert('Error', 'Please select your age');
      return;
    }
    if (!selectedGender) {
      Alert.alert('Error', 'Please select your gender');
      return;
    }
    if (selectedLanguages.length === 0) {
      Alert.alert('Error', 'Please select at least one language');
      return;
    }

    // Submit the data to the API
    // Here, you can perform an API call with the collected data

    // For demonstration purposes, navigate to the next screen
    navigation.navigate('Screen3', {
      email,
      age,
      gender: selectedGender,
      languages: selectedLanguages.join(', '), // Convert array to comma-separated string
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Picker
        selectedValue={age}
        style={styles.picker}
        onValueChange={(itemValue: string) => setAge(itemValue)} // Specify type for itemValue
      >
        {/* Create picker items dynamically */}
        {Array.from({ length: 35 - 18 + 1 }, (_, index) => index + 18).map((item) => (
          <Picker.Item label={item.toString()} value={item.toString()} key={item.toString()} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedGender}
        style={styles.picker}
        onValueChange={(itemValue: string) => setSelectedGender(itemValue)} // Specify type for itemValue
      >
        <Picker.Item label="Select Gender" value="" />
        {genders.map((gender) => (
          <Picker.Item label={gender.name} value={gender.id} key={gender.id} />
        ))}
      </Picker>
      <PassionsList onSelectLanguages={setSelectedLanguages} /> {/* Pass onSelectLanguages prop */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '80%',
  },
  picker: {
    height: 50,
    width: '80%',
  },
});

export default Screen2;
