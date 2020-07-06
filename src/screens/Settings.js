import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const Settings = (props) => {
  const { navigation } = props;
  const LANGUAGES = [ 
    'Spanish', 
    'Korean', 
    'Chinese', 
    'Japanese', 
    'French',
    'German', 
    'Vietnamese'
    ]

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <View >
        {LANGUAGES.map(
          lang => <Text key={lang}>{lang}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.popToTop()}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  text: {
    color: '#747EFD',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#747EFD',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

export default Settings;