import React, { useReducer } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import * as Google from 'expo-google-app-auth';
import ENV from '../../env';

//useReducer 
// state
const initialState = {
  // user - using the variable to match with backend
  uid: null,
  username: null,
  email: null,
  provider: null
}

// function that accepts the action(state to be changed) and changes the state
const reducer = action => {
  switch(action.type) {
    case 'successfully_login':
      return {
        // overriding whatever we have in the state with payload
        ...state,
        ...action.payload
      }
  }
}

const Home = (props) => {

  const { navigation } = props;
  // dispatch calls the reducer and pass the action(action should be an object)
  // const [state, dispatch] = useReducer(reducer, initialState);
  

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ENV.androidClientId,
        iosClientId: ENV.iosClientId,
        scopes: ['profile', 'email'],
      });

      // {
      //   uid: state.uid,
      //   firstName: state.
      // }

      // how to update state
      // dispatch({
      //   type: 'successfully_login',
      //   payload: {
      //     uid: 1233,
      //     firstName: 'Bob'
      //   }
      // });
  
      
      if (result.type === 'success') {
        console.log("result", result);
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