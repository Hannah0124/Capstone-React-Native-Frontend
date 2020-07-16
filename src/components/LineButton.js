import React from 'react';
import { Platform, Button, StyleSheet, TouchableOpacity } from 'react-native';

// import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const LineButton = props => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <Button 
      {...props} 
      IconComponent={Ionicons} 
      iconSize={23}
      color={Platform.OS === 'android' ? '#fff' : Colors.primary}
    />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    // backgroundColor:
    borderColor: Colors.primary,
    borderWidth: 3,
    borderRadius: 30,
    paddingHorizontal: 5,
    marginVertical: 15,
    marginHorizontal: 5
  }
});

export default LineButton;