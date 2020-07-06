import React from 'react';
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Detail from '../screens/Detail';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Home'
        screenOptions={{
          gestrueEnabled: true // for Android (swipe gesture)
        }}
      >
        <Stack.Screen 
          name='Home' 
          component={Home} 
          options={{ title: 'Home Screen' }} 
        />

        <Stack.Screen 
          name='Detail' 
          component={Detail} 
          options={{ title: 'Detail Screen' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default MainStackNavigator;