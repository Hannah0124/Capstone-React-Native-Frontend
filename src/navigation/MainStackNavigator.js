import React from 'react';
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import WordTranslator from '../screens/WordTranslator';
import PhotoTranslator from '../screens/PhotoTranslator';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
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
          // options={{ title: 'Detail Screen' }} 
          // custom title
        />

        <Stack.Screen 
          name='PhotoTranslator' 
          component={PhotoTranslator} 
          // options={{ title: 'Detail Screen' }} 
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