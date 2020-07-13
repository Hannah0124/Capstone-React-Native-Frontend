import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

// import HeaderButton from '../components/HeaderButton';
import ImageItem from '../components/ImageItem';
import * as imagesActions from '../store/images-actions';

const List = props => {
  const images = useSelector(state => state.images.images);

  console.log('images in List.js: ', images)
  const dispatch = useDispatch();

  
  const newImages = props.route.params.images;
  // console.log('images in List.js: ', props.route.params.images)

  const listComponent = newImages.map(image => {
    return (
      <ImageItem 
        image={image.imageUri}
        text={image.text}
        translatedText={image.translatedText}
      />
    )
  })

  // useEffect(() => {
  //   dispatch(imagesActions.loadImages());
  // }), [dispatch];

  return (
    { listComponent }
    // <FlatList
    //   data={images}
    //   keyExtractor={item => item.id}
    //   // renderItem={itemData => (
    //   itemData={ listComponent }
    //     // <ImageItem
    //     //   image={itemData.item.imageUri}
    //     //   // title={itemData.item.title}
    //     //   // text={itemData.item.text}
    //     //   // translatedText={itemData.item.translatedText}
    //     //   onSelect={() => {
    //     //     // props.navigation.navigate('ImageDetail', {
    //     //     //   imageTitle: itemData.item.title,
    //     //     //   imageId: itemData.item.id
    //     //     // });
    //     //   }}
    //     // />
    //   // )}
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