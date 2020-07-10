import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const ImageItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.imageItem}>
      <Image style={styles.image} source={{ uri: props.image }} />
      <View style={styles.infoContainer}>
        {/* <Text style={styles.title}>{props.title}</Text> */}
        <Text style={styles.title}>{props.text}</Text>
        <Text style={styles.title}>{props.translatedText}</Text>
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
    alignItems: 'center'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: Colors.primary,
    borderWidth: 1
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: '#000',
    fontSize: 18,
    marginBottom: 5
  },
  address: {
    color: '#666',
    fontSize: 16
  }
});

export default ImageItem;
