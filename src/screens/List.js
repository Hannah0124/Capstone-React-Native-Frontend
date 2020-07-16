import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert } from 'react-native';
import axios from 'axios';

import ImageItem from '../components/ImageItem';
import URLS from '../constants/Urls';
import Colors from '../constants/Colors';

// import { HeaderButtons, Item } from 'react-navigation-header-buttons';
// import { useSelector, useDispatch } from 'react-redux';
// import { useIsFocused } from '@react-navigation/native';
// import * as imagesActions from '../store/images-actions';
// import HeaderButton from '../components/HeaderButton';


const List = props => {
  const id = props.route.params.currentId;
  const [list, setList] = useState([]);

  // TEST: TODO
  // const myCurrentImages = useSelector(state => props.route.params.myImages);
  // setMyImages(myCurrentImages);

  // const myImages = useSelector(state => props.route.params.myImages);


  const getImages = () => {
    axios.get(URLS.BASE_URL + '/images')
      .then(response => {
        const apiData = response.data.images;
        // console.log('apiData? ', apiData);

        const currImages = apiData.filter(image => {
          return image.user_id === id
        });

         // console.log('currImages??' , currImages)
        setList(currImages);
      })
      .catch(err => {
        console.log('internal API - error: ', err);
        setErrorMessage(err.message);
      });
  };

  useEffect(() => {
    getImages();
  }, []);

  const updateList = (image_id) => {
    const updatedList = list.filter(image => image.id !== image_id);

    setList(updatedList);
  };


  const areYouSure = (id) => {
    Alert.alert(
      "Delete the image",
      "Are you sure?",
      [
        { text: "OK", 
          onPress: () => {
            removeImageHandler(id)
            console.log("OK Pressed") 
          }
        },
        { text: "Cancel", 
          onPress: () => {
            console.log("Cancel Pressed") 
          }
        }
      ]
    )
    return true;
  };

  const removeImageHandler = (id) => {
    axios.post(`${URLS.BASE_URL}/image/${id}`)
    .then(response => {
      console.log('4. internal API - successfully deleted: ', response.data);
      updateList(id);
    })
    .catch(err => {
      console.log('4. internal API - error (deleted): ', err);
    });
  };

  // useEffect(() => {
  //   dispatch(imagesActions.loadImages());
  // }), [dispatch];

  console.log('list?? ', list)

  return (
    <View>
      {list && list.length === 0 &&
        <View style={styles.noImage}><Text style={styles.test}>Add Your Favorites :D</Text></View>
      }
      <FlatList
        data={list}
        extraData={list}
        keyExtractor={item => item.id.toString()} // All keys must now be string values.
        key={item => Date.now() + item.id}
        renderItem={itemData => (
          <ImageItem
            removeImageHandlerCallback={areYouSure}
            imageUri={itemData.item.image_url}
            text={itemData.item.text}
            translatedText={itemData.item.translated_text}
            favorite={itemData.item.favorite}
            language={itemData.item.language}
            user_id={itemData.item.user_id}
            id={itemData.item.id}
            original_lang={itemData.item.original_lang}
            // onSelect={() => {
            //   // props.navigation.navigate('ImageDetail', {
            //   //   imageTitle: itemData.item.title,
            //   //   imageId: itemData.item.id
            //   // });
            //   }}
            /> 
          )} 
        />
    </View>
  );
};


const styles = StyleSheet.create({
  noImage: {
    fontSize: 50,
    color: "red"
  },
  test: {
    fontSize: 25,
    color: Colors.primary,
    textAlign: 'center',
    marginTop: 280,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default List;