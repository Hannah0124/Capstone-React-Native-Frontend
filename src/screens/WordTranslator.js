import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert , TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux'; // TEST
import * as ImageManipulator from "expo-image-manipulator";
import axios from 'axios';
import ENV from '../../env';
import * as Speech from 'expo-speech';
import { AntDesign } from '@expo/vector-icons';

// TODO: TEST
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import LANGUAGES from '../constants/Languages';
import Colors from '../constants/Colors';
import * as imagesActions from '../store/images-actions';
import ImagePicker from '../components/ImagePicker';
import LineButton from '../components/LineButton';
import URLS from '../constants/Urls';

const defaultLanguage = Localization.locale.includes("-") ? Localization.locale.split("-")[0] : Localization.locale

const WordTranslator = (props) => {
  // console.log(props.route.params)
  const id = props.route.params.currentId || 1;
  // const testImages = props.route.params.images;

  // const [titleValue, setTitleValue] = useState('');
  const [selectedImage, setSelectedImage] = useState();
  const [apiPhoto, setAPIPhoto] = useState();
  const [getText, setGetText] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [translatedText, setTranslatedText] = useState();
  const [targetLang, setTargetLang] = useState('en');
  // const [flashMessage, setFlashMessage] = useState(null);
  const [images, setImages] = useState([]);
  const [myImages, setMyImages] = useState([]);
  const [originalLang, setOriginalLang] = useState('en');

  const initialStateForm = {
    image_url: null,
    text: null,
    translated_text: null,
    favorite: false,
    language: null,
    user_id: props.route.params.currentId
  }
  const [state, setState] = useState(initialStateForm);

  const { route, navigation } = props;
  const dispatch = useDispatch(); // TEST

  // TEST
  const titleChangeHandler = text => {
    // You could add validation 
    setTitleValue(text);
  };


  // useEffect(() => {
  //   axios.get(URLS.BASE_URL + '/images')
  //     .then(response => {

  //       const apiData = response.data.images;
  //       setImages(apiData);

  //       console.log('apiData? ', apiData);

  //       const currImages = apiData.filter(image => {
  //         return image.user_id === uid
  //       })

  //       setMyImages(currImages);
  //     })
  //     .catch(err => {
  //       console.log('internal API - error: ', err)
  //       setErrorMessage(err.message);
  //     })
  // }, [])



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
    
    const body = {
      id: images.length + 1,
      image_url: selectedImage, // apiPhoto,
      text: getText,
      translated_text: translatedText,
      favorite: true,
      language: targetLang,
      user_id: id
    };


    const copyState = {...state}
    copyState["id"] = images.length + 1
    copyState["favorite"] = true
    setState(copyState);

    console.log("images.length? ", images.length + 1)
    const copyMyImages = [...myImages];
    axios.post(`${URLS.BASE_URL}/add_image`, body)
      .then(response => {
        console.log('internal API - success: ', response.data)

        copyMyImages.push(body);
        setMyImages(copyMyImages);

        console.log('copyMyImages in Photo', copyMyImages);

        // navigation.navigate('List', { currentUid: uid, myImages: copyMyImages })
      })
      .catch(err => {
        console.log('3. internal API - error: ', err)

        Alert.alert(
          "Unique value needed",
          "Oops. The same picture or text exists in your favorite list. Please update a unique value.",
          [
            { 
              text: "OK",
              onPress: () => console.log("OK pressed")
            }
          ]
        )
    
      })

    // dispatch(imagesActions.addImage(selectedImage, getText, translatedText, true, 'Korean'));

    // // navigation.goBack();
    
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
          const LANG = response.data.responses[0].textAnnotations[0].locale
          // console.log('SUCCESS 4', response.data.responses[0].textAnnotations[0].locale);
          setGetText(TEXT);
          // console.log(LANG);
          if (googleDetected(LANG)) {
            setOriginalLang(LANG);
          }
          // getTranslated(encodeURI(TEXT));
          getTranslated(TEXT);
        })
        .catch((error) => {

          Alert.alert(
            "Text Needed",
            "Please select a picture with text",
            [
              { text: "OK", 
                onPress: () => console.log("OK Pressed") 
              }
            ]
          )
          setErrorMessage(error.message);
          console.log('error', error);
        })
    }
  };
  const googleDetected = (detectLang) => {
    return Object.keys(LANGUAGES).find(label => {
      return LANGUAGES[label] == detectLang;
    })
  };


  const getTranslated = (text) => {
    //TODO : finish up the API call
    // console.log(item.language);
    const ENCODED = encodeURI(text)
    let target_lang 
    // console.log(route.params.item)
    if (route.params.item) {
      const { item } = route.params
      target_lang = item.language
    } else {
      target_lang = "zh-TW"
    }
    console.log('loading')
    console.log('lang', target_lang);
    setTargetLang(target_lang);
    const translateUrl = `https://translation.googleapis.com/language/translate/v2?target=${target_lang}&key=${ENV.googleApiKey}&q=${ENCODED}`
    axios.post(translateUrl)
    .then((response) => {
      const TRANSLATION = response.data.data.translations[0].translatedText;
      // console.log('Translation', TRANSLATION);
      setTranslatedText(TRANSLATION);
    })
    .catch((error) => {
      setErrorMessage(error.message);
      console.log('error', error);
    })
  }

  const toSpeak = (words, lang) => {
    // let lang;
    // let words;
    // if (translatedText) {
    //   words = translatedText;
    //   lang = targetLang;
    // } else {  
    //   words = getText;
    //   lang = 'en'
    // }
    Speech.speak( words,{language: lang});
  }
  const getImages = () => {
    axios.get(URLS.BASE_URL + '/images')
      .then(response => {

        const apiData = response.data.images;
        setImages(apiData);

        // console.log('apiData? ', apiData);

        const currImages = apiData.filter(image => {
          return image.user_id === id
        })

        // console.log('currImages??' , currImages)
        setMyImages(currImages);
      })
      .catch(err => {
        console.log('internal API - error: ', err)
        setErrorMessage(err.message);
      })

  };
  useEffect(() => {
    getImages();
  }, []);


  // const updateImages = (newMyImages) => {
  //   setMyImages(newMyImages);
  // }
  // TEST

  const displayLanguage = (target) => {
    return Object.keys(LANGUAGES).find(label => {
      return LANGUAGES[label] == target;
    })
  };
  
  const getTranslation = () => {
    if (!targetLang) {
      Alert.alert(
        "Need to select Language",
        "Please change a language setting",
        [
          { text: "OK", 
            onPress: () => console.log("OK Pressed") 
          }
        ]
      )
    } else {
      getTranslated(getText);
      setState({...state, favorite: false});
    }
  }

  const languageButtons = (marginTop) => {
    return (
      <View style={styles.buttonContainer} marginTop={marginTop}>
        <TouchableOpacity
          style={styles.cornerButton}
          onPress={() => {
            navigation.navigate('Settings', { item: 'text' })
          }}
        >
          <Text style={styles.buttonText}>Language</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cornerButton}
          onPress={getTranslation}  
        >
          <Text style={styles.buttonText}> Let's translate! </Text>
        </TouchableOpacity>
      </View>
    )
  }

  // const removeImageHandler = (id) => {

  //   const copyState = {...state}
  //   copyState["favorite"] = false;
  //   setState(copyState);

  //   axios.post(`${URLS.BASE_URL}/image/${id}`)
  //     .then(response => {
  //       console.log('4. internal API - successfully deleted: ', response.data)
  //       setState(initialStateForm);

  //       const filterdMyImages = myImages.filter(image => {
  //         return image.id !== id
  //       });

  //       console.log('filtered? ', filterdMyImages)
  //       setMyImages(filterdMyImages);
  //     })
  //     .catch(err => {
  //       console.log('4. internal API - error (deleted): ', err)
  //     })
  // };

  const reset = () => {
    setState(initialStateForm);
    setAPIPhoto(null);
    setGetText(null);
    setTranslatedText(null);
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={styles.text}>Word Translator Content</Text> */}
        {/* <TextInput 
          style={styles.textInput} 
          onChangeText={titleChangeHandler} 
          value={titleValue}
        /> */}

      <View style={styles.favoriteButton}>
      {myImages.length > 0 && 
          <Button 
            title="My Favorites" 
            color={Colors.primary} 
            onPress={() => {
              navigation.navigate('List', 
              {
                currentId: id, 
                images: images,
                myImages: myImages,
                // updateImagesCallback: updateImages,
                // removeImageHandlerCallback: removeImageHandler
              })
            }}
          />
        }
        </View>

        {/* <View >
          <Button 
            title="Reset" 
            color={Colors.primary} 
            onPress={reset}
          />
        </View> */}

        <ImagePicker 
          onImageTaken={imageTakenHandler} 
          resetCallback={reset}
        />

        <View style={styles.buttonContainer}>
          {apiPhoto && targetLang && getText && translatedText && (state.favorite === true) && 
            <AntDesign 
              name="star" 
              size={30} 
              color="#C99B13" 
              backgroundColor="#fff"
              // onPress={() => removeImageHandler(state.id)}
            >
            </AntDesign>
          }
          
          {apiPhoto && targetLang && getText && translatedText && (state.favorite === false) && 
            <AntDesign.Button 
            name="staro" 
            size={30} 
            color="#C99B13" 
            backgroundColor="#fff"
            onPress={saveImageHandler}
            >
            </AntDesign.Button>
          }


        {/* <Text>
          {getText}
        </Text>
        <Text>
          {translatedText}
        </Text>
         */}

          { apiPhoto &&
            <LineButton 
              title="Get Words"
              color={Colors.primary}
              onPress={getWords}
            />
          }


        </View>
        
        { (translatedText || getText)  && 
          <View style={styles.cardsContainer}> 
            <View style={styles.cardContainer}>
              <Text style={styles.cardText}>{displayLanguage(originalLang)}</Text>
              <Text style={styles.card}>
                  {getText}
              </Text>

            <AntDesign.Button 
            name="sound" 
            size={24} 
            color={Colors.primary} 
            backgroundColor='#fff'
            onPress={() => toSpeak(getText, originalLang)}
            />
            </View>
          </View>
        }
        { (translatedText || getText)  && 
          <View style={styles.cardsContainer}> 
            <View style={styles.cardContainer}>
              <Text style={styles.cardText}>{displayLanguage(targetLang)}</Text>
              <Text style={styles.card}>
                  {translatedText}
              </Text>

            <AntDesign.Button 
            name="sound" 
            size={24} 
            color={Colors.primary} 
            backgroundColor='#fff'
            onPress={() => toSpeak(translatedText, targetLang)}
            />
            </View>
          </View>
        }

        {/* <Button 
          title="Save Image" 
          color={Colors.primary} 
          onPress={saveImageHandler}
        /> */}
        {/* <Button 
          title="Get Words" 
          color={Colors.primary} 
          onPress={getWords}
        /> */}

        {
          // (translatedText || getText)  && 
            // <AntDesign.Button 
            //   name="sound" 
            //   size={24} 
            //   color={Colors.primary} 
            //   backgroundColor='#fff'
            //   onPress={toSpeak}
            // />
        }
        {
          // (getText)  && 
          // <Button 
          //     title="Let's translate!"
          //     color={Colors.primary}
          //     onPress={getTranslated}
          // />
        }
        {/* <View>
          <Text>Selected Language: {displayLanguage} ({targetLang})</Text>
        </View> */}
        {/* <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            navigation.navigate('Settings', { item: 'word' })
          }}
        >
          <Text style={styles.buttonText}>Language Settings</Text>
        </TouchableOpacity> */}

        {/* <Button 
          title="Save Image" 
          color={Colors.primary} 
          onPress={saveImageHandler}
        /> */}
        {
          apiPhoto && getText && languageButtons(60)  
        }
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
    paddingTop: 50,
    paddingBottom: '100%',
  },
  // text: {
  //   // color: '#fff',
  //   color: '#747EFD',
  //   fontSize: 24,
  //   fontWeight: 'bold'
  // },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#FAFAFA',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 0,
    width: 270
  },
  // textbox: {
  //   // borderWidth: 1,
  //   // borderRadius: 5,
  //   maxWidth: "70%",
  //   minWidth: "70%",
  //   // borderColor: Colors.primary
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  cornerButton: {
    right: 0,
    backgroundColor: Colors.primary,
    color: "#fff",
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  cardsContainer: {
    marginTop: 10
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cardText: {
    marginRight: 20,
  },
  favoriteButton: {
    position: 'absolute',
    top: 0,
    right: 0
  },
})

export default WordTranslator;