import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import * as Google from 'expo-google-app-auth';
import ENV from '../../env';

const Home = (props) => {

  const { navigation } = props;
  
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: ENV.androidClientId,
        iosClientId: ENV.iosClientId,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vizlator</Text>
      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={signInWithGoogleAsync}
      >
        <Text style={styles.buttonText}>Log in with Google</Text>
      </TouchableOpacity>

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