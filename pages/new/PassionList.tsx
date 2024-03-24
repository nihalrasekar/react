// PassionsList.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  onSelectLanguages: (languages: string[]) => void; // Define prop type
}

const passions = [
  { name: 'English', isSelected: false },
  { name: 'Tamil', isSelected: false },
  { name: 'Kannada', isSelected: false },
  { name: 'Telugu', isSelected: false },
  { name: 'Malyalam', isSelected: false },
  { name: 'Bengali', isSelected: false },
  { name: 'Odia', isSelected: false },
  { name: 'Hindi', isSelected: false },
  { name: 'Assamese', isSelected: false },
  { name: 'Punjabi', isSelected: false },
  { name: 'Marathi', isSelected: false },
  { name: 'Gujarati', isSelected: false },
  // ... other passions
];

const PassionItem = ({ name, isSelected, onPress }: { name: string; isSelected: boolean; onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={[styles.passionItem, isSelected && styles.selectedPassion]}>
    <Text style={styles.passionText}>{name}</Text>
  </TouchableOpacity>
);

const PassionsList: React.FC<Props> = ({ onSelectLanguages }) => {
  const [selectedPassions, setSelectedPassions] = useState(passions.map((passion) => ({ ...passion, isSelected: false }))); // Initialize with all unselected
  const [language, setLanguage] = useState<string[]>([]); // State for selected languages

  const handlePress = (index: number) => {
    const newSelectedPassions = [...selectedPassions];
    newSelectedPassions[index].isSelected = !newSelectedPassions[index].isSelected;
    setSelectedPassions(newSelectedPassions);

    const selectedLanguage = selectedPassions[index].name;
    if (newSelectedPassions[index].isSelected) {
      setLanguage([...language, selectedLanguage]); // Add to language array
    } else {
      setLanguage(language.filter((lang) => lang !== selectedLanguage)); // Remove from language array
    }

    // Call onSelectLanguages prop with updated language array
    onSelectLanguages(language);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedPassions}
        renderItem={({ item, index }) => (
          <PassionItem
            name={item.name}
            isSelected={item.isSelected}
            onPress={() => handlePress(index)}
          />
        )}
        keyExtractor={(item) => item.name}
        numColumns={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Make container take all available space
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  passionItem: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  passionText: {
    fontSize: 16,
  },
  selectedPassion: {
    backgroundColor: 'red', // Change this to your desired color
  },
});

export default PassionsList;
