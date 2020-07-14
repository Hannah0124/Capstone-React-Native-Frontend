// import { StatusBar } from 'expo-status-bar';

import React, { useEffect, useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios'; 

import MainStackNavigator from './src/navigation/MainStackNavigator';

import imagesReducer from './src/store/images-reducer';
import { init } from './src/helpers/db';

import URLS from './src/constants/Urls';


init()
  .then(() => {
    console.log('Initialized database');
  })
  .catch(err => {
    console.log('Initializing db failed.');
    console.log(err);
  });

const rootReducer = combineReducers({
  images: imagesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  console.log('images in App.js: ', images);

  // const getImages = (userId, images) => {
  //   const myImages = images.filter(image => {
  //     return image.user_id === userId
  //   })
  //   setImages(myImages);
  // };

  
  // // TEST
  // // const baseUrl = 'http://192.168.0.38:5000';
  // useEffect(() => {
  //   axios.get(URLS.BASE_URL + '/images')
  //     .then(response => {

  //       console.log('internal API - success in App.js: ', response.data.images)

  //       const apiData = response.data.images;

  //       // getImages(1, apiData); // 1 => dummy_data
  //       setImages(apiData);
  //     })
  //     .catch(err => {
  //       console.log('internal API - error: ', err)
  //       setErrorMessage(err.message);
  //     })
  // }, [])

  // const updateImages = (newImages) => {
  //   setImages(newImages);
  // }

  // useEffect(updateImages, [images]);

  return (
    <Provider store={store}>
      {/* <MainStackNavigator /> */}
      {/* <MainStackNavigator images={images} updateImagesCallback={updateImages} />  */}
      <MainStackNavigator /> 
      {/* TODO */}
    </Provider>
  );
};
