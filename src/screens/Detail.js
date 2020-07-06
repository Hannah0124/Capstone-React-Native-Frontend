import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const Detail = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Contents</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#747EFD'
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

export default Detail;