import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // open camera!
import * as Permissions from 'expo-permissions'; //  expo install expo-permissions

import Colors from '../constants/Colors';

const SCREEN = Dimensions.get('screen');

const ImgPicker = props => {
  const [pickedImage, setPickedImage] = useState();

  // Ask permission for IOS (Android doesnt need this!)
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);

    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant camera permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true; // permission granted
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return; // cannot continue
    }

    // can continue
    const image = await ImagePicker.launchCameraAsync({
      // allowsEditing: true, // crop
      aspect: [16, 9],
      quality: 0.5
    }); // it's async because we dont know when a user will open a camera!

    // console.log(image);

    setPickedImage(image.uri); // got image!
    props.onImageTaken(image.uri);
  };

  // choose image from gallery
  const handleChoosePhoto = async () => {
    // function to get image from gallery
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return; // cannot continue
    }

    const image = await ImagePicker.launchImageLibraryAsync(
                  {
                    aspect: [16, 9],
                    quality: 0.5
                  });

    setPickedImage(image.uri); // got image from gallery
    props.onImageTaken(image.uri);
  };


  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text>No image picked yet.</Text>
        ) : (
          <Image
            style={styles.image}
            source={{ uri: pickedImage }}
            resizeMode="contain"
          />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler} // open up the camera, and display it to the user
      />
      <Button
        title="Choose Photo"
        color={Colors.primary}
        onPress={handleChoosePhoto} // open up the gallery and user will be able to choose picture
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
    // flex: 1
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1
  },
  image: {
    width: SCREEN.width * 0.75,
    height: 200,

  }
});

export default ImgPicker;

// reference - gallery: https://docs.expo.io/versions/latest/sdk/imagepicker/