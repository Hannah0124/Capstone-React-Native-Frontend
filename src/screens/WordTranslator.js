import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert , Button, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux'; // TEST
import * as ImageManipulator from "expo-image-manipulator";
import axios from 'axios';
import ENV from '../../env';
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons';

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
  const [targetLang, setTargetLang] = useState();
  const [flashMessage, setFlashMessage] = useState(null);

  const { route, navigation } = props;
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
    if (!apiPhoto) {
      Alert.alert(
        "Image Needed",
        "Please select a picture from gallery or take a picture",
        [
          { text: "OK", 
            onPress: () => console.log("OK Pressed") 
          }
        ]
      )
    } else {
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
          // getTranslated(encodeURI(TEXT));
        })
        .catch((error) => {
          setErrorMessage(error.message);
          console.log('error', error);
        })
    }
  };

  const getTranslated = () => {
    //TODO : finish up the API call
    // console.log(item.language);
    const ENCODED = encodeURI(getText)
    let target_lang 
    if (route.params) {
      const { item } = route.params
      target_lang = item.language
    } else {
      target_lang =  "es"
    }
    setTargetLang(target_lang);
    const translateUrl = `https://translation.googleapis.com/language/translate/v2?target=${target_lang}&key=${ENV.googleApiKey}&q=${ENCODED}`
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

  const toSpeak = () => {
    let lang;
    let words;
    if (translatedText) {
      words = translatedText;
      lang = targetLang;
    } else {  
      words = getText;
      lang = 'en'
    }
    Speech.speak( words,{language: lang});
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Word Translator Content</Text>
        
        <ImagePicker 
          onImageTaken={imageTakenHandler} 
        />
      
        {/* <Text>
          {getText}
        </Text>
        <Text>
          {translatedText}
        </Text>
         */}

        
        { (translatedText || getText)  && 
          <View style={styles.card}>
            <Text style={styles.textbox}>
              {getText}
            </Text>
            <Text style={styles.textbox}>
              {translatedText}
            </Text>
          </View>
        }

        {/* <Button 
          title="Save Image" 
          color={Colors.primary} 
          onPress={saveImageHandler}
        /> */}
        <Button 
          title="Get Words" 
          color={Colors.primary} 
          onPress={getWords}
        />

        {
          (translatedText || getText)  && 
            <AntDesign.Button 
              name="sound" 
              size={24} 
              color={Colors.primary} 
              backgroundColor='#fff'
              onPress={toSpeak}
            />
        }
        { (getText)  && 
          <Button 
              title="Let's translate!"
              color={Colors.primary}
              onPress={getTranslated}
          />
        }
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('Settings', { item: 'word' })
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
  card: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 80,
    marginVertical: 20,
    alignItems:'center',
  },
  textbox: {
    // borderWidth: 1,
    // borderRadius: 5,
    maxWidth: "70%",
    minWidth: "70%",
    // borderColor: Colors.primary
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
  },
})

export default WordTranslator;