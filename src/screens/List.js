import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// import HeaderButton from '../components/HeaderButton';
import ImageItem from '../components/ImageItem';
import * as imagesActions from '../store/images-actions';

import URLS from '../constants/Urls';

const List = props => {
  // const myImages = props.route.params.myImages;
  // console.log('params in List.js: ', props.route.params.myImages)
  // const [images, setImages] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);

  
  // TEST: TODO
  // const images = useSelector(state => state.images.images);
  const myImages = useSelector(state => props.route.params.myImages);

  // console.log('1. images in List.js!!: ', images);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(imagesActions.loadImages());
  }), [dispatch];

  
  // const newImages = props.route.params.images;
  console.log('2. myImages in List.js: ', myImages)

  const listComponent = myImages.map(image => {
    return (
      <ImageItem 
        imageUri={image.image_url}
        text={image.text}
        translatedText={image.translated_text}
        favorite={image.favorite}
        language={image.language}
      />
    )
  })

  

  return (
    <View>
      {/* <View>
      {listComponent}
      </View> */}


    <FlatList
      data={myImages}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ImageItem
          imageUri={itemData.item.image_url}
          text={itemData.item.text}
          translatedText={itemData.item.translated_text}
          favorite={itemData.item.favorite}
          language={itemData.item.language}
          onSelect={() => {
            // props.navigation.navigate('ImageDetail', {
            //   imageTitle: itemData.item.title,
            //   imageId: itemData.item.id
            // });
            }}
          /> 
        )} 
      />
    </View>

  );
};

List.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      // <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Buttons>
        <Item
          title="Add Place"
          color="#fff"
          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
          onPress={() => {
            // navData.navigation.navigate('NewPlace');
          }}
        />
      {/* </HeaderButtons> */}
      </Buttons>
    )
  };
};


const styles = StyleSheet.create({});

export default List;