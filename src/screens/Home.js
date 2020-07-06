import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const Home = (props) => {

  const { navigation } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vizlator</Text>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('WordTranslator')}
      >
        <Text style={styles.buttonText}>Translating Words</Text>
        {/* <Text style={styles.buttonText}>Who is {character.name}?</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('PhotoTranslator')}
      >
        <Text style={styles.buttonText}>Translating Photo</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#747EFD',
    // backgroundColor: '#fff',

  },
  text: {
    color: '#fff',
    // color: '#747EFD',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    borderColor: '#fff',
    backgroundColor: '#747EFD',
    // borderColor: '#747EFD',
    // backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 15,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    // color: '#747EFD',
  }
})

export default Home;

// reference: https://heartbeat.fritz.ai/getting-started-with-stack-navigator-using-react-navigation-5-in-react-native-and-expo-apps-4c516becaee1