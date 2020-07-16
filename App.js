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
  // const [images, setImages] = useState([]);
  

  // console.log('images in App.js: ', images);

  return (
    <Provider store={store}>
      {/* <MainStackNavigator /> */}
      {/* <MainStackNavigator images={images} updateImagesCallback={updateImages} />  */}
      <MainStackNavigator /> 
      {/* TODO */}
    </Provider>
  );
};
