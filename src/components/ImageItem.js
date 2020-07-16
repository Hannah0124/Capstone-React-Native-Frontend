import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import LANGUAGES from '../constants/Languages';

// displayLanguage(i18n.locale)


const displayLanguage = (target) => {
  return Object.keys(LANGUAGES).find(label => {
    return LANGUAGES[label] == target;
  })
};

const ImageItem = props => {

  // console.log('props in ImageItem: ', props)
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.imageItem}>
      <Image style={styles.image} source={{ uri: props.imageUri }} />
      <View style={styles.infoContainer}>
        <Text style={styles.gray}>{props.original_lang}:</Text> 
        <Text style={styles.originalLanguage}>{props.text}</Text>

        <Text style={styles.gray}>{props.language}:</Text>
        <Text style={styles.translatedLanguage}>{props.translatedText}</Text>
        {/* <Text style={styles.title}>favorite: {props.favorite ? "YES" : "NO"}</Text> */}
        {/* <Text style={styles.sub}>user id: {props.user_id}</Text>
        <Text style={styles.sub}>image id: {props.id}</Text> */}
        <TouchableOpacity 
          style={styles.removeBtn}
        >
          <FontAwesome.Button 
            name="remove" 
            size={24} 
            color="red" 
            backgroundColor="transparent" 
            onPress={() => props.removeImageHandlerCallback(props.id)}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    height: 250
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  originalLanguage: {
    color: '#000',
    fontSize: 18,
    marginBottom: 35
  },
  translatedLanguage: {
    color: '#000',
    fontSize: 18,
  },
  sub: {
    color: '#666',
    fontSize: 13
  },
  removeBtn: {
    position: "absolute",
    top: -35,
    right: -45,
    marginRight: 0,
    paddingRight: 0,
  },
  gray: {
    color: '#666',
    fontSize: 13
  }
});

export default ImageItem;
