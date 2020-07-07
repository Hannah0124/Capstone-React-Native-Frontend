import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Picker } from 'react-native';

const Settings = (props) => {
  const [currLanguage, setCurrLanguage] = useState();

  const { navigation } = props;
  const LANGUAGES = { 
    Spanish: 'es', 
    Korean: 'ko', 
    Chinese: 'zh-TW', 
    Japanese: 'ja', 
    French: 'fr',
    German: 'de', 
    Vietnamese: 'vi'
  };

  const getLangProp = (lang) => {
    if (lang === 'Chinese') {
      setCurrLanguage('zh-TW');
    } else if (lang === 'Korean') {
      setCurrLanguage('ko');
    } else if (lang === 'Spanish') {
      setCurrLanguage('es');
    } else if (lang === 'Japanese') {
      setCurrentLanguage('ja');
    }
  }

  const languageComponents = Object.keys(LANGUAGES).map(label => {
    return (
      <Picker.Item label={label} value={LANGUAGES[label]} />
    )
  });


  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <View>
        {/* {LANGUAGES.map(
          lang => <Text key={lang}>{lang}</Text>
        )} */}
      </View>

      {/* test */}
      <View>
        <Picker
          selectedValue={currLanguage}
          onValueChange={() => getLangProp(currLanguage)}
          style={{ width: 160 }}
          mode="dropdown"
        >
          <Picker.Item label="Options"/> 
          {languageComponents}
        </Picker>
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


// reference: https://cloud.google.com/translate/docs/languages