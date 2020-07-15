import React, { useState, useReducer, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Button, Alert } from 'react-native';
import axios from 'axios';
import ENV from '../../env'; 
import * as Google from 'expo-google-app-auth';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

import Colors from '../constants/Colors';
import URLS from '../constants/Urls';

const SIGN_IN = 'SIGNED_IN';
const SIGN_OUT = 'SIGNED_OUT';

// const BASE_URL = 'http://192.168.0.38:5000';

const initialStateForm = {
  signedIn: false,
  photoUrl: "",
  uid: null, 
  provider: null, 
  username: null, 
  email: null,
  accessToken: null
};

// Reducer: Take old state and genearate the new state
// function that accepts the action(state to be changed) and changes the state
const reducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { 
        ...state, 
        ...action.payload,
        signedIn: true 
      };
    case SIGN_OUT:
      return { 
        ...state, 
        ...action.payload,
        signedIn: false 
      };
    default:
      throw new Error("Don't understand action");
  };
};
  //accessToken to authenticate & authorize users?? not sure if we should pass accessToken around!
  //  <-- should be JWT to make it security!!!!!
  ///////////// send them JWT to set loggin after closing the app ///////////////////

const Home = (props) => {

  const { navigation } = props;

  // dispatch calls the reducer and pass the action(action should be an object)
  const [state, dispatch] = useReducer(reducer, initialStateForm);
  const [userIds, setUserIds] = useState([]);

  console.log('userIds: ', userIds);

  // get ids! (TEST)
  useEffect(() => {
    axios.get(`${URLS.BASE_URL}/users`)
      .then(response => {
        console.log('SUCCESS 1: ', response.data);
        const ids = response.data.users.map(user =>{
          return user.id
        })

        setUserIds(ids);
      })
      .catch(err => {
        console.log('ERROR 1: ', err);

      })

  }, []);
  
  const addUserApiCall = (body) => {
    // if user exists, dont call /add_user api
    const hasUser = userIds.find(id => {
      return id == body.id;
    });

    if (!hasUser) {
      // BACKEND API CALL TRAIL ( using my own Network IP for now)
    
      // console.log('body in addUserApiCall: ', body);
    
     ///////////// TODO: TO DO API CALL TO BACKEND TO SEE IF USER EXIST/ CREATE USER//////////
      axios.post(`${URLS.BASE_URL}/add_user`, body)
      .then(response => {
        console.log('SUCCESS (new user): ', response.data);
      })
      .catch(err => {
        console.log('ERROR 2: ', err);
      })
    } else {
      // // TEST (TODO)
      axios.post(`${URLS.BASE_URL}/login`, {
        "username": body.username,
        "password": body.password || null
      }).then(response => {
        console.log('SUCCESS (returning user): ', response.data);

      }).catch(err => {
        console.log('ERROR 3: ', err); // [Error: Request failed with status code 401] TODO!
      })
    }
  };

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: ENV.androidClientId,
        iosClientId: ENV.iosClientId,
        scopes: ['profile', 'email'],
      });

      // console.log('login result: ', result);
      // "accessToken": "3",
      // "idToken": "2",
      // "refreshToken": "1",

  
      if (result.type === 'success') {
        // how to update state
        dispatch({
          type: SIGN_IN,
          payload: {
            photoUrl: result.user.photoUrl,
            uid: result.user.id, //google called it differently
            provider: "Google", 
            username: result.user.name, //google called it differently
            email: result.user.email,
            accessToken: result.accessToken //accessToken to authenticate & authorize users??
          }
        });

        const body = {
          uid: parseInt(result.user.id), 
          provider: "Google", 
          username: result.user.name, 
          email: result.user.email,
          password: result.accessToken
        }


        addUserApiCall(body);

        return result.accessToken; // TODO: ???
      } else {
        console.log('cancelled');
        // return { cancelled: true };
      }
    } catch (err) {
      Alert.alert(
        "Login Failed",
        "Please try again!",
        [
          { text: "OK", 
            onPress: () => console.log("OK Pressed") 
          }
        ]
      )
      console.log('error', err)
      // return { error: true };
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Vizlator</Text>

      {state.signedIn ? (
        <LoggedInPage username={state.username} photoUrl={state.photoUrl} />
      ) :
        <LoginPage signIn={signIn} />
      }

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate(
          'WordTranslator',
          {
            currentId: state.id
          }
        )}
      >
        <Text style={styles.buttonText}>Translate Text</Text>
        <MaterialCommunityIcons name="format-text" size={24} color="#fff" />
        {/* <Text style={styles.buttonText}>Who is {character.name}?</Text> */}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate(
          'PhotoTranslator',
          {
            currentId: state.id
          }
        )}
      >
        <Text style={styles.buttonText}>Translate Image</Text>
        <Entypo name="image" size={24} color="#fff" />
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
      <Text style={styles.header}>Welcome {props.username}!</Text>
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
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 50
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    // backgroundColor: Colors.primary,
    borderWidth: 3,
    borderRadius: 15,
    padding: 10,
    margin: 20,
    marginTop: 0,
    width: 200
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    marginRight: 10
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50
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
    position: 'absolute',
    bottom: 50,
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

// useState or useReducer: https://www.youtube.com/watch?v=NnwkRvElx9E
// useReducer: https://www.youtube.com/watch?v=cKzrgB6MqqM
// payload: https://www.youtube.com/watch?v=AQLNv2nasU0