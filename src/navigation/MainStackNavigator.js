import React from 'react';
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import WordTranslator from '../screens/WordTranslator';
import PhotoTranslator from '../screens/PhotoTranslator';
import List from '../screens/List';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const MainStackNavigator = (props) => {
  console.log('props in MainStackNavigator: ', props);

  const myProps = {
    updateImagesCallback:() => props.updateImagesCallback()
  };  
  // <Navigator  screenProps={props} />

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
          gestrueEnabled: true, // for Android (swipe gesture)
          headerStyle: {
            backgroundColor: '#747EFD'
          },
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerTintColor: '#fff',
          headerBackTitleVisible: false // for IOS
        }}
        headerMode='float' // for Android
      >
        <Stack.Screen 
          name='Home' 
          component={Home} 
          options={{ title: 'Home Screen' }} 
        />

        <Stack.Screen 
          name='WordTranslator' 
          component={WordTranslator} 
          options={{ title: 'Text Translator' }} 
          // custom title
        />

{/* <AppNavigator screenProps={{signOut: this.signOut}} /> */}
        <Stack.Screen 
          name='PhotoTranslator' 
          component={PhotoTranslator} 
          initialParams={{ images: props.images, updateImagesCallback: props.updateImagesCallback }}
          options={{ title: 'Image Translator'}} 
          // screenProps={myProps}
          // custom title
        >
          
        </Stack.Screen>

        <Stack.Screen 
          name='List' 
          component={List} 
          // initialParams={{ images: props.images }} // TODO
          // options={{ title: 'Image List' }} 
          // custom title
        />

        <Stack.Screen 
          name='Settings'
          component={Settings}
          options={{ title: 'Settings' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default MainStackNavigator;

// reference: https://reactnavigation.org/docs/params/