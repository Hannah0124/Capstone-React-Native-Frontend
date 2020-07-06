import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const PhotoTranslator = (props) => {
  const { route, navigation } = props;
  const { item } = route.params;
  const { name, home, species } = item;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Photo Translator Content</Text>

      {/* dummy data */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Name: {name}</Text>
        <Text style={styles.cardText}>Home Planet: {home}</Text>
        <Text style={styles.cardText}>Species: {species}</Text>
      </View>

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
  card: {
    width: 350,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    // borderColor: '#fff',
    borderColor: '#747EFD',
    opacity: 10,
    margin: 10,
    padding: 10,
    alignItems: 'center'
  },
  cardText: {
    fontSize: 18,
    // color: '#fff',
    color: '#747EFD',
    marginBottom: 5
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