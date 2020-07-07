import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux'; // TEST
import * as ImageManipulator from "expo-image-manipulator";
import axios from 'axios';
import ENV from '../../env';

import Colors from '../constants/Colors';
import * as imagesActions from '../store/images-actions';
import ImagePicker from '../components/ImagePicker';


const WordTranslator = (props) => {

  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [apiPhoto, setAPIPhoto] = useState();
  const [getText, setGetText] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [translatedText, setTranslatedText] = useState();

  const { navigation } = props;

  const dispatch = useDispatch(); // TEST

  // TEST
  const titleChangeHandler = text => {
    // You could add validation 
    setTitleValue(text);
  };

  // TEST
  const imageTakenHandler = async imagePath => {
    setSelectedImage(imagePath);
    // a promise
    let photo = await ImageManipulator.manipulateAsync(
      imagePath,
      [{ resize: { width: 420 } }],
      {
        base64: true
      }
    );
  
    setAPIPhoto(photo.base64);
  };
  
  // TEST
  const saveImageHandler = () => {
    dispatch(imagesActions.addImage(titleValue, selectedImage));
    navigation.goBack();
  };
  
  
  const getWords = () => {
    const baseUrl = `https://content-vision.googleapis.com/v1/images:annotate?key=${ENV.googleApiKey}`;
    const body = {
      requests: [
        {
          features: [
            {
              type: 'TEXT_DETECTION',
              // maxResults: 1
            }
          ],
          image: {
            content: apiPhoto
            // source: {
            //   imageUri: "https://cdn-01.media-brady.com/store/stus/media/catalog/product/cache/4/image/85e4522595efc69f496374d01ef2bf13/1544623159/f/i/first-aid-safety-signs-j28-010-lg.png"
            // }
          },
        }
      ]
    }
    axios.post(baseUrl, body)
      .then((response) => {
        const TEXT = response.data.responses[0].textAnnotations[0].description;
        console.log('SUCCESS 4', TEXT);
        setGetText(TEXT);
        getTranslated(encodeURI(TEXT));
      })
      .catch((error) => {
        setErrorMessage(error.message);
        console.log('error', error);
      })
  };

  const getTranslated = (text) => {
    //TODO : finish up the API call
    // let target_lang = "zh-TW"
    console.log('calling translation');
    console.log(text);
    const translateUrl = `https://translation.googleapis.com/language/translate/v2?target=zh&key=${ENV.googleApiKey}&q=${text}`
    axios.post(translateUrl)
    .then((response) => {
      const TRANSLATION = response.data.data.translations[0].translatedText;
      console.log('Translation', TRANSLATION);
      setTranslatedText(TRANSLATION);
    })
    .catch((error) => {
      setErrorMessage(error.message);
      console.log('error', error);
    })
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Word Translator Content</Text>

        {/* TEST */}
        <TextInput 
          style={styles.textInput} 
          onChangeText={titleChangeHandler} 
          value={titleValue}
        />

        <ImagePicker 
          onImageTaken={imageTakenHandler} 
        />
        <Text>
          {getText}
        </Text>
        <Text>
          {translatedText}
        </Text>
        <Button 
          title="Save Image" 
          color={Colors.primary} 
          onPress={saveImageHandler}
        />
        <Button 
          title="Get Words" 
          color={Colors.primary} 
          onPress={getWords}
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