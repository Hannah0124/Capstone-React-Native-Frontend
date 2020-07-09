import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native'; 
import { useDispatch } from 'react-redux'; // TEST
import * as ImageManipulator from "expo-image-manipulator"; // npm i expo-image-manipulator
import axios from 'axios'; // npm i react-native-axios
import ENV from '../../env'; // npm i expo-env
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import LANGUAGES from '../constants/Languages';
import * as imagesActions from '../store/images-actions';
import ImagePicker from '../components/ImagePicker';

const PhotoTranslator = (props) => {

  const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [apiPhoto, setApiPhoto] = useState();
  const [getText, setGetText] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [flashMessage, setFlashMessage] = useState(null);
  const [currLanguage, setCurrLanguage] = useState('en');
  const [translatedText, setTranslatedText] = useState(null);

  const { route, navigation } = props;
  
  const getLanguage = () => {
    
    console.log('route? ', route);
    
    if (!route.params) {
      setFlashMessage('You must change language setting!');

      setTimeout(() => {
        setFlashMessage(null);
      }, 3000);

      return;
    }

    const { item } = route.params;
    const { language } = item;
    console.log('language: ', language);

    setCurrLanguage(language);
    getTranslated(getText, language);

    return language 
  }; 

  const dispatch = useDispatch(); // TEST

  // TEST
  const titleChangeHandler = text => {
    // You could add validation 
    setTitleValue(text);
  };

  // TODO: TEST
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
    dispatch(imagesActions.addImage(titleValue, selectedImage, getText, translatedText));
    // navigation.goBack();
    navigation.navigate('List') // , { item: 'photo' }
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
        setErrorMessage('');
        setTranslatedText(null);

        // // TODO (TEST)
        // getLanguage();
      })
      .catch(err => {
        setErrorMessage(err.message);
        console.log('(1) ERROR - Vision API: ', err);

        // edge case
        if (!apiPhoto) {
          setFlashMessage('No image to get words!');

          setTimeout(() => {
            setFlashMessage(null);
          }, 3000);
        }
      })
  };

  const getTranslated = (word, targetLang) => {
    const baseUrl = `https://translation.googleapis.com/language/translate/v2?key=${ENV.googleApiKey}`;

    const body = {
        q: word,
        source: "en",
        target: targetLang, // e.g. "es",
        format: "text"
      }

    axios.post(baseUrl, body)
      .then(response => {
        // console.log('response.data: ', response.data.data.translations[0].translatedText);

        setTranslatedText(response.data.data.translations[0].translatedText);
        setErrorMessage('');

      })
      .catch(err => {
        setFlashMessage('Something went wrong. :(');

        // TODO
        setTimeout(() => {
          setFlashMessage(null);
        }, 3000);

        setErrorMessage(err.message);
        console.log('(2) ERROR - Translation API: ', err);
      })
  };


  const displayLanguage = Object.keys(LANGUAGES).find(label => {
    return LANGUAGES[label] == currLanguage;
  });

  const speak = () => {
    let targetText = translatedText || getText;

    Speech.speak(targetText, {language: currLanguage});
  };
  

  
  // useEffect(getWords, [currLanguage]);
  // useEffect(getLanguage, [currLanguage]);


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.text}>Photo Translator</Text>

        {/* TEST */}
        <TextInput 
          style={styles.textInput} 
          onChangeText={titleChangeHandler} 
          value={titleValue}
        />

      
        { flashMessage && 
          <View style={styles.flash}>
            <Text>{flashMessage}</Text> 
          </View> 
        }

        {/* 
        <Text>
          {errorMessage && errorMessage}
        </Text> */}


        <ImagePicker 
          onImageTaken={imageTakenHandler} 
        />

        <Button 
          title="Get Words"
          color={Colors.primary}
          onPress={getWords}
          style={styles.buttonContainer}
        />


        { (translatedText || getText)  && 
          <View style={styles.card}>
            <Text>
              {getText && getText}
            </Text>

            <Text>
              {translatedText}
            </Text>
          </View>
        }


        {
          (translatedText || getText)  && 
            <AntDesign.Button 
              name="sound" 
              size={24} 
              color={Colors.primary} 
              backgroundColor='#fff'
              onPress={speak}
            />
        }

        { getText &&
          <Button 
            title="Let's translate!"
            color={Colors.primary}
            onPress={getLanguage} // onPress={() => {getTranslated(getText, currLanguage)}}
          />
        }
        
        <View>
          <Text>Selected Language: {displayLanguage} ({currLanguage})</Text>
        </View>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('Settings', { item: 'photo' })
          }}
        >
          <Text style={styles.buttonText}>Language Settings</Text>
        </TouchableOpacity>

        <Button 
          title="Save Image" 
          color={Colors.primary} 
          onPress={saveImageHandler}
        />
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
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
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  card: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 80,
    marginVertical: 20
  },
  flash: {
    backgroundColor: '#fff3cd',
    color: '#856404',
    borderColor: '#ffeeba',
    padding: 10,
    marginBottom: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default PhotoTranslator;

// reference - picker: https://snack.expo.io/S1_ipbwSL
// reference - speech: https://docs.expo.io/versions/latest/sdk/speech/
// reference - icon: https://docs.expo.io/guides/icons/