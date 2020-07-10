import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button } from 'react-native';
import ENV from '../../env'; 
import * as Google from 'expo-google-app-auth';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../constants/Colors';


const Home = (props) => {

  const { navigation } = props;

  const initialStateForm = {
    signedIn: false,
    name: "",
    photoUrl: ""
  };

  const [initialState, setInitialState] = useState(initialStateForm);

  
  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ENV.androidClientId,
        iosClientId: ENV.iosClientId,
        scopes: ['profile', 'email'],
      });
  
      if (result.type === 'success') {
        setInitialState({
          signedIn: true,
          name: result.user.name, // username?
          photoUrl: result.user.photoUrl
        })

        // return result.accessToken;
      } else {
        console.log('cancelled');
        // return { cancelled: true };
      }
    } catch (err) {
      console.log('error', err)
      // return { error: true };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vizlator</Text>

      {initialState.signedIn ? (
        <LoggedInPage name={initialState.name} photoUrl={initialState.photoUrl} />
      ) :
        <LoginPage signIn={signIn} />
      }

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


const LoginPage = props => {
  return (
    <View style={styles.googleBtn}>
      <AntDesign name="google" size={24} color="red" />
      <Button title="Sign in with Google" onPress={() => props.signIn()} />

    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.userContainer}>
      <Text style={styles.header}>Welcome {props.name}!</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  text: {
    color: '#fff',
    // color: '#747EFD',
    fontSize: 50,
    fontWeight: 'bold'
  },
  buttonContainer: {
    borderColor: '#fff',
    // backgroundColor: Colors.primary,
    borderWidth: 3,
    borderRadius: 15,
    padding: 10,
    margin: 20,
    marginTop: 0
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30

  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    marginBottom: 0,
    width: 100,
    height: 100,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 100
  },
  googleBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 20,
  },

})

export default Home;

// reference: https://heartbeat.fritz.ai/getting-started-with-stack-navigator-using-react-navigation-5-in-react-native-and-expo-apps-4c516becaee1

// google login front-end: https://www.youtube.com/watch?v=ELXvcyiTTHM
// google login documentation: https://docs.expo.io/versions/latest/sdk/google/?redirected
// login button style: https://codepen.io/slukas23/pen/qwMevr