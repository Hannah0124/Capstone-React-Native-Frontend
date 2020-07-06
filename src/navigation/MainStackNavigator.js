import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '../screens/Home'
import PhotoTranslator from '../screens/PhotoTranslator'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer initialRouteName='Home'>
      <Stack.Navigator>
      <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name='PhotoTranslator'
          component={PhotoTranslator}
          options={{ title: 'Translate things by taking a photo!' }}
        />
        <Stack.Screen
          name='WordTranslator'
          component={PhotoTranslator}
          options={{ title: 'Translate them in different languages!' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator