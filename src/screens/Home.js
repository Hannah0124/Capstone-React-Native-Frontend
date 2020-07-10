import React, { useReducer, useState } from 'react'
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
  provider: null,
  accessToken: null,
  //accessToken to authenticate & authorize users?? not sure if we should pass accessToken around!
  //  <-- should be JWT to make it security!!!!!
  ///////////// send them JWT to set loggin after closing the app ///////////////////
}

// function that accepts the action(state to be changed) and changes the state
const reducer = (state, action)=> {
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const [login, setLogin] = useState(false);

  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ENV.androidClientId,
        iosClientId: ENV.iosClientId,
        scopes: ['profile', 'email'],
      });
      
      if (result.type === 'success') {
        console.log("result", result);
        // how to update state
        dispatch({
          type: 'successfully_login',
          payload: {
            uid: result.user.id, //google called it differently
            username: result.user.name, //google called it differently
            email: result.user.email,
            provider: "Google",
            accessToken: result.accessToken //accessToken to authenticate & authorize users??
          }
        });
        // TODO: TO DO API CALL TO BACKEND TO SEE IF USER EXIST/ CREATE USER
        setLogin(true);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  console.log("state", state);
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vizlator</Text>
      
      { (login !== true ) &&
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={signInWithGoogleAsync}
        >
          <Text style={styles.buttonText}>Log in with Google</Text>
        </TouchableOpacity>
      }
      
      { (login) &&
        <Text>Welcome {state.username}!</Text>
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