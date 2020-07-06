import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux'; // TEST

import Colors from '../constants/Colors';
import * as imagesActions from '../store/images-actions';
import ImagePicker from '../components/ImagePicker';

const WordTranslator = (props) => {

  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();

  const { navigation } = props;

  const dispatch = useDispatch(); // TEST

  // TEST
  const titleChangeHandler = text => {
    // You could add validation 
    setTitleValue(text);
  };

  // TEST
  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  // TEST
  const saveImageHandler = () => {
    dispatch(imagesActions.addImage(titleValue, selectedImage));
    navigation.goBack();
  };



  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Photo Translator Content</Text>

        {/* TEST */}
        <TextInput 
          style={styles.textInput} 
          onChangeText={titleChangeHandler} 
          value={titleValue}
        />

        <ImagePicker 
          onImageTaken={imageTakenHandler} 
        />
        <Button 
          title="Save Image" 
          color={Colors.primary} 
          onPress={saveImageHandler}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Settings')}
        >
          <Text style={styles.buttonText}>Go to Settings</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#747EFD',
    backgroundColor: '#fff',
    margin: 30

  },
  text: {
    // color: '#fff',
    color: '#747EFD',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#747EFD',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
})

export default WordTranslator;