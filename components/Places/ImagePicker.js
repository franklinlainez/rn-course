import React, { useState } from 'react';
import { Alert, Text, Image, StyleSheet, View } from 'react-native';
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../../UI/OutlinedButton';

const ImagePicker = ({onTakeImage}) => {
  const [cameraPermissionInfo, requestPermission] = useCameraPermissions();
  const [image, setImage] = useState();

  const verifyPermission = async () => {


    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED || cameraPermissionInfo.status === PermissionStatus.DENIED) {
      const permissionResponse = await requestPermission();
      
      return permissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant camera permissions to use this app'
      );

      return false;
    }

    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }

    const _image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setImage(_image.uri);
    onTakeImage(_image.uri);
  };

  let imagePreview = <Text>No image taken yet.</Text>;

  if (image) {
    imagePreview = <Image style={styles.image} source={{ uri: image }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
