import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// import HeaderButton from '../components/HeaderButton';
import ImageItem from '../components/ImageItem';
import * as imagesActions from '../store/images-actions';

import URLS from '../constants/Urls';

const List = props => {
  // const myImages = props.route.params.myImages;
  console.log('???props in List.js: ', props)
  // const [myImages, setMyImages] = useState([]);
  // const [errorMessage, setErrorMessage] = useState(null);
  

  
  // TEST: TODO
  // const myCurrentImages = useSelector(state => props.route.params.myImages);
  // setMyImages(myCurrentImages);

  const myImages = useSelector(state => props.route.params.myImages);
  // const [newImages, setNewImages] = useState([myImages]);

  console.log('myImages from list.js~: ', myImages)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(imagesActions.loadImages());
  }), [dispatch];

  
  // const newImages = props.route.params.images;
  console.log('2. myImages in List.js: ', myImages)


  const removeImageHandler = (id) => {

    axios.post(`${URLS.BASE_URL}/image/${id}`)
      .then(response => {
        console.log('4. internal API - successfully deleted: ', response.data)

        const filterdMyImages = myImages.filter(image => {
          return image.id !== id
        });

        props.route.params.updateImagesCallback(filterdMyImages)
        // setNewImages(filterdMyImages);

        Alert.alert(
          "Delete the image",
          "Are you sure?",
          [
            { text: "OK", 
              onPress: () => console.log("OK Pressed") 
            }
          ]
        )

        // props.navigation.navigate('List');
        // props.navigation.goBack();

      })
      .catch(err => {
        console.log('4. internal API - error (deleted): ', err)
        Alert.alert(
          "Something went wrong",
          `Please try again. Error Message: ${err.message}\n`,
          [
            { text: "OK", 
              onPress: () => console.log("OK Pressed") 
            }
          ]
        )
      })
  };
  
  return (
    <View>
      <FlatList
        data={myImages}
        keyExtractor={item => item.id}
        key={item => Date.now() + item.id}
        renderItem={itemData => (
          <ImageItem
            removeImageHandlerCallback={removeImageHandler}
            imageUri={itemData.item.image_url}
            text={itemData.item.text}
            translatedText={itemData.item.translated_text}
            favorite={itemData.item.favorite}
            language={itemData.item.language}
            user_id={itemData.item.user_id}
            id={itemData.item.id}
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