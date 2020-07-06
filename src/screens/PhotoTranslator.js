import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const PhotoTranslator = (props) => {
  const { navigation } = props
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Photo Translator Content</Text>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#747EFD',
    backgroundColor: '#fff',

  },
  text: {
    // color: '#fff',
    color: '#747EFD',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#747EFD',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
})

export default PhotoTranslator;