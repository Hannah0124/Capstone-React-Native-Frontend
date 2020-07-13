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
  const myImages = props.route.params.myImages;
  console.log('params in List.js: ', props.route.params.myImages)
  const testImages = useSelector(state => state.images.images);

  // console.log('testImages: ', testImages);

  
  const [images, setImages] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(imagesActions.loadImages());
  // }), [dispatch];

  

  // console.log('images in List.js: ', images);

  // const getImages = (uid, images) => {
  //   const myImages = images.filter(image => {
  //     return image.uid === uid
  //   })
  //   console.log('myImages: ', myImages)
  //   setImages(myImages);
  // };

  // useEffect(() => {
  //   axios.get(URLS.BASE_URL + '/images')
  //     .then(response => {

  //       const apiData = response.data.images;

  //       getImages(props.route.params.currentUid, apiData); // 1 => dummy_data
  //       // setImages(apiData);
  //     })
  //     .catch(err => {
  //       console.log('internal API - error: ', err)
  //       setErrorMessage(err.message);
  //     })
  // }, [])



  // console.log('1. images in List.js: ', images)

  
  // const newImages = props.route.params.images;
  console.log('2. images in List.js: ', props.route.params.images)

  const listComponent = myImages.map(image => {
    return (
      <ImageItem 
        image={image.image_url}
        text={image.text}
        translatedText={image.translated_text}
      />
    )
  })

  

  return (
    <View>
      {listComponent}
    </View>


    // <FlatList
    //   data={images}
    //   keyExtractor={item => item.id}
    //   renderItem={itemData => (
    //   // itemData={ listComponent }
    //     <ImageItem
    //       // image={image.image_url}
    //       // text={image.text}
    //       // translatedText={image.translated_text}
    //       image={itemData.item.image_url}
    //       title={itemData.item.title}
    //       text={itemData.item.text}
    //       translatedText={itemData.item.translated_text}
    //       onSelect={() => {
    //         // props.navigation.navigate('ImageDetail', {
    //         //   imageTitle: itemData.item.title,
    //         //   imageId: itemData.item.id
    //         // });
    //       }}
    //     />
    //   )}
    // />
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