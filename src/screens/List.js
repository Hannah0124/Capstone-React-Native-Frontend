import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

// import HeaderButton from '../components/HeaderButton';
import ImageItem from '../components/ImageItem';
import * as imagesActions from '../store/images-actions';

const List = props => {
  const images = useSelector(state => state.images.images);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(imagesActions.loadImages());
  }), [dispatch];

  return (
    <FlatList
      data={images}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ImageItem
          image={itemData.item.imageUri}
          // title={itemData.item.title}
          // text="dummy text"
          // translatedText="dummy text"
          text={itemData.item.text}
          translatedText={itemData.item.translatedText}
          onSelect={() => {
            // props.navigation.navigate('ImageDetail', {
            //   imageTitle: itemData.item.title,
            //   imageId: itemData.item.id
            // });
          }}
        />
      )}
    />
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