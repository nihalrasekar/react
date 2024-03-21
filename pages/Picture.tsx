import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

interface PictureProps {
  onSelectMedia: (uri: string) => void;
}

const Picture: React.FC<PictureProps> = ({ onSelectMedia }) => {
  useEffect(() => {
    openMediaPicker();
  }, []);

  const openMediaPicker = async () => {
    try {
      const res: DocumentPickerResponse | DocumentPickerResponse[] | null = await DocumentPicker.pick({
        type: [DocumentPicker.types.images, DocumentPicker.types.video],
      });

      if (res) {
        const selectedMediaArray = Array.isArray(res) ? res : [res];
        for (const selectedMedia of selectedMediaArray) {
          onSelectMedia(selectedMedia.uri);
        }
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled');
      } else {
        console.log('Error:', err);
        Alert.alert('Error', 'An error occurred while selecting media.');
      }
    }
  };

  return null;
};

export default Picture;
