// navigation reference from :
// https://heartbeat.fritz.ai/getting-started-with-stack-navigator-using-react-navigation-5-in-react-native-and-expo-apps-4c516becaee1
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import PhotoTranslator from '../screens/PhotoTranslator'
import WordTranslator from '../screens/WordTranslator'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer  
      initialRouteName='Home'
      screenOptions={{
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: '#101010'
        },
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerTintColor: '#ffd700',
        headerBackTitleVisible: false
      }}
      headerMode='float'>
      <Stack.Navigator>
      <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name='PhotoTranslator'
          component={PhotoTranslator}
          options={{ title: 'Picture worth a thousand words' }}
        />
        <Stack.Screen
          name='WordTranslator'
          component={WordTranslator}
          options={{ title: 'No more Language Barrier' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator