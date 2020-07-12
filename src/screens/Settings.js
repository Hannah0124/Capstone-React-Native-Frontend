
import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Picker } from 'react-native';

import LANGUAGES from '../constants/Languages';

const Settings = (props) => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

    const { navigation } = props;
  // const { item } = route.params;

  const changeOption = (lang) => {
    setSelectedLanguage(lang);
  };

  const displayLanguage = Object.keys(LANGUAGES).find(label => {
    return LANGUAGES[label] == selectedLanguage;
  });
  

  const languageComponents = Object.keys(LANGUAGES).map((label, i) => {
    return (
      <Picker.Item key={i} label={label} value={LANGUAGES[label]} />
    )
  });

  const goBack = () => {
    const { route } = props;
    const { item } = route.params;
    console.log('item:', item)

    if (item === 'photo') {
      navigation.navigate('PhotoTranslator', {
        item: {language: selectedLanguage}
      });
    } else {
      navigation.navigate('WordTranslator', {
        item: {language: selectedLanguage}
      });
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Language Settings</Text>

      <View>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={changeOption}
          style={{ width: 160 }}
          mode="dropdown"
        >
          <Picker.Item label="Options"/> 
          {languageComponents}
        </Picker>
        <Text>Language selectd: {displayLanguage}</Text>
      </View>

      {/* <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('WordTranslator', {
          item: {language: selectedLanguage}})
        }
      >
        <Text style={styles.buttonText}>Translating Words</Text>
      </TouchableOpacity> */}

      {/* <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('PhotoTranslator', 
          {item: {language: selectedLanguage}})
        }
      >
        <Text style={styles.buttonText}>Translating Photo</Text>
      </TouchableOpacity> */}



      {/* TEST */}
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={goBack}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>


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


// reference: https://cloud.google.com/translate/docs/languages