import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // open camera!
import * as Permissions from 'expo-permissions'; //  expo install expo-permissions

import { FontAwesome, Entypo } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const SCREEN = Dimensions.get('screen');

const ImgPicker = props => {
  // console.log('root??', props.root)


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

    // // can continue
    // let image = await ImagePicker.launchCameraAsync({
    //   // allowsEditing: true, // crop
    //   aspect: [16, 9],
    //   quality: 0.5
    // }); // it's async because we dont know when a user will open a camera!

    let image = null;

    if (props.root === 'word') {
      image = await ImagePicker.launchCameraAsync({
        // allowsEditing: true, // crop // TODO
        aspect: [4, 3],
        quality: 1
      });
    } else {
      // can continue
      image = await ImagePicker.launchCameraAsync({
        aspect: [16, 9],
        quality: 0.5
      }); // it's async because we dont know when a user will open a camera!
    }

    // console.log(image);

    // edge case (when a user has not choose an image)
    if (!image.uri) {
      return;
    }

    setPickedImage(image.uri); // got image!
    props.onImageTaken(image.uri);

    props.resetCallback();
  };

  // choose image from gallery
  const chooseImageHandler = async () => {

    console.log('props in ImagePicker.js? ', props);
    // function to get image from gallery
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return; // cannot continue
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      aspect: [16, 9],
      quality: 0.5
    });

    // edge case (when a user has not choose an image)
    if (!image.uri) {
      return;
    }

    setPickedImage(image.uri); // got image from gallery
    props.onImageTaken(image.uri);  

    props.resetCallback();
  };


  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text style={styles.previewText}>No image picked yet.</Text>
        ) : (
          <Image
            style={styles.image}
            source={{ uri: pickedImage }}
            resizeMode="contain"
          />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Entypo.Button 
          name="camera" 
          size={35} 
          title="Take Image"
          color='#fff'
          backgroundColor={Colors.primary}
          onPress={takeImageHandler} // open up the camera, and display it to the user
        />
        <View style={styles.space}>{}</View>

        <FontAwesome.Button 
          name="photo" 
          size={35} 
          title="Choose Photo"
          color='#fff'
          backgroundColor={Colors.primary}
          onPress={chooseImageHandler} // open up the gallery and user will be able to choose picture
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 0,
    // flex: 1
    height: 300
  },
  imagePreview: {
    // width: 250,
    // height: 200,

    position: 'absolute',
    top: 10,
    width: 280,
    height: 230,
    marginTop: 0,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    overflow: 'hidden',
    // borderWidth: 2,
    // borderColor: Colors.primary,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  previewText: {
    color: 'gray',
    fontSize: 20
  },
  image: {
    width: SCREEN.width * 0.75,
    height: 300,
    
  },
  buttonContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    width: '100%',
    height: 110,
    position: 'absolute',
    bottom: -460,
    margin: 0,
    paddingHorizontal: 10
  },
  space: {
    width: 150
  }
});

export default ImgPicker;

// reference - gallery: https://docs.expo.io/versions/latest/sdk/imagepicker/