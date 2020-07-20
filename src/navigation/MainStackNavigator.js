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


  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
          gestrueEnabled: true, // for Android (swipe gesture)
          headerStyle: {
            backgroundColor: '#373946'
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
          // style={{"backgroundColor": "#373946"}}
          options={{ title: 'Home Screen' }} 
        />

        <Stack.Screen 
          name='WordTranslator' 
          component={WordTranslator} 
          options={{ title: 'Text Translator' }} 
          // custom title
        />


        <Stack.Screen 
          name='PhotoTranslator' 
          component={PhotoTranslator} 
          // initialParams={{ images: props.images }}
          options={{ title: 'Image Translator'}} 
        >
          
        </Stack.Screen>

        <Stack.Screen 
          name='List' 
          component={List} 
          options={{ title: 'My Favorites' }}
        />

        <Stack.Screen 
          name='Settings'
          component={Settings}
          options={{ title: 'Language Settings' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default MainStackNavigator;

// reference: https://reactnavigation.org/docs/params/