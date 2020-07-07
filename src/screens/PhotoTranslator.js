import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux'; // TEST
import * as ImageManipulator from "expo-image-manipulator"; // npm i expo-image-manipulator
import axios from 'axios'; // npm i react-native-axios
import ENV from '../../env'; // npm i expo-env

import Colors from '../constants/Colors';
import * as imagesActions from '../store/images-actions';
import ImagePicker from '../components/ImagePicker';

const PhotoTranslator = (props) => {

  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [apiPhoto, setApiPhoto] = useState();
  const [getText, setGetText] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [currLanguage, setCurrLanguage] = useState('ko');
  const [translatedText, setTranslatedText] = useState();

  const { route, navigation } = props;
  

  
  const getLanguage = () => {
    console.log(route);
    const { item } = route.params;
    const { language } = item;
    console.log('language: ', language);
    setCurrLanguage(language);
  };

  const dispatch = useDispatch(); // TEST

  // TEST
  const titleChangeHandler = text => {
    // You could add validation 
    setTitleValue(text);
  };

  // TODO 
  // TEST
  const imageTakenHandler = async imagePath => {
    setSelectedImage(imagePath);

    // a promise 
    let photo = await ImageManipulator.manipulateAsync(
      imagePath,
      [{ resize: { width: 420 }}],
      {
        base64: true
      }
    );

    setApiPhoto(photo.base64);
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
              maxResults: 1,  //TODO: 1 for now due to API charge
              type: "LABEL_DETECTION"
            },
          ],
          //
          image: {
            // source: {
              content: apiPhoto
              // gcsImageUri: ""
            // }
          },
        }
      ]
    }

    axios.post(baseUrl, body)
      .then(response => {
        console.log('response.data: ', response.data.responses[0].labelAnnotations)

        const apiData = response.data.responses[0].labelAnnotations;

        const descriptions = apiData.map(data => {
          return data.description;
        })

        console.log('SUCCESS 4', descriptions);
        setGetText(descriptions.join(', '));
        getLanguage();
        translate(descriptions.join(', '), currLanguage);

      })
      .catch(err => {
        setErrorMessage(err.message);
        console.log('error: ', err);
      })
  };

  const translate = (word, targetLang) => {
    const baseUrl = `https://translation.googleapis.com/language/translate/v2?key=${ENV.googleApiKey}`;

    const body = {
        q: word,
        source: "en",
        target: targetLang, // e.g. "es",
        format: "text"
      }

    axios.post(baseUrl, body)
      .then(response => {
        // response.data.translations[0].translatedText
        console.log('response.data: ', response.data.data.translations[0].translatedText);
        setTranslatedText(response.data.data.translations[0].translatedText);

      })
      .catch(err => {
        setErrorMessage(err.message);
        console.log('error: ', err);
      })
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

        <Text>
          {errorMessage && errorMessage}
        </Text>

        <Text>
          {getText && getText}
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

        <Button 
          title="Let's Translate!"
          color={Colors.primary}
          onPress={() => {translate(getText, currLanguage)}}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('Settings')
            // TEST
            // navigation.navigate('Settings', {
            //   language: currLanguage
            // })
          }}
        >
          <Text style={styles.buttonText}>Language Settings</Text>
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

export default PhotoTranslator;