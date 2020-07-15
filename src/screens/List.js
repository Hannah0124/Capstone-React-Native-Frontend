import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

// import HeaderButton from '../components/HeaderButton';
import ImageItem from '../components/ImageItem';
import * as imagesActions from '../store/images-actions';

import URLS from '../constants/Urls';



const List = props => {
  // console.log('???props in List.js: ', props.route.params)
  // const [errorMessage, setErrorMessage] = useState(null);

  

  const id = props.route.params.currentId;

  const myImages = props.route.params.myImages;

  const [list, setList] = useState([]);

  const getImages = () => {
    axios.get(URLS.BASE_URL + '/images')
      .then(response => {

        const apiData = response.data.images;
        // setImages(apiData);

        // console.log('apiData? ', apiData);

        const currImages = apiData.filter(image => {
          return image.user_id === id
        })

        // console.log('currImages??' , currImages)
        setList(currImages);
      })
      .catch(err => {
        console.log('internal API - error: ', err)
        setErrorMessage(err.message);
      })

  };

  useEffect(() => {
    getImages();
  }, [list]);

  
  // TEST: TODO
  // const myCurrentImages = useSelector(state => props.route.params.myImages);
  // setMyImages(myCurrentImages);

  // const myImages = useSelector(state => props.route.params.myImages);


  const updateList = (image_id) => {
    const updatedList = myImages.filter(image => {
      return image.id !== image_id
    });

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
        
        console.log('4. internal API - successfully deleted: ', response.data)
        
        // const filteredMyImages = myImages.filter(image => {
        //   return image.id !== id
        // });
        updateList(id);


      })
      .catch(err => {
        console.log('4. internal API - error (deleted): ', err)
      })

  };



  // useEffect(() => {
  //   dispatch(imagesActions.loadImages());
  // }), [dispatch];


  return (
    <View>
      <FlatList
        data={list}
        extraData={list}
        keyExtractor={item => item.id}
        key={item => Date.now() + item.id}
        renderItem={itemData => (
          <ImageItem
            // removeImageHandlerCallback={props.route.params.removeImageHandlerCallback}
            // removeImageHandlerCallback={removeImageHandler}
            removeImageHandlerCallback={areYouSure}
            imageUri={itemData.item.image_url}
            text={itemData.item.text}
            translatedText={itemData.item.translated_text}
            favorite={itemData.item.favorite}
            language={itemData.item.language}
            user_id={itemData.item.user_id}
            id={itemData.item.id}
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

// List.navigationOptions = navData => {
//   return {
//     headerTitle: 'All Places',
//     headerRight: () => (
//       // <HeaderButtons HeaderButtonComponent={HeaderButton}>
//       <Buttons>
//         <Item
//           title="Add Place"
//           color="#fff"
//           iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
//           onPress={() => {
//             // navData.navigation.navigate('NewPlace');
//           }}
//         />
//       {/* </HeaderButtons> */}
//       </Buttons>
//     )
//   };
// };


const styles = StyleSheet.create({});

export default List;