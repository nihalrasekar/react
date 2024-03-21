// Edit.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import Picture from './Picture';

const Edit: React.FC = () => {
  const [mediaUri, setMediaUri] = useState<string | null>(null);

 
  const onSelectMedia = (uri: string) => {
    setMediaUri(uri);
  };


  return (
    <View style={styles.container}>
      <Picture onSelectMedia={onSelectMedia} />
      {mediaUri && (
        <Image source={{ uri: mediaUri }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Edit;
