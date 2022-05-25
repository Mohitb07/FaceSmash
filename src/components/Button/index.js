import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({onPress = () => {}, text = '', disabled = false}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.btn, disabled && styles.disabled]}
      onPress={onPress}>
      <Text style={[styles.btnText, disabled && styles.disabled]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  btn: {
    backgroundColor: '#0b59a2',
    padding: 15,
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: '#063561',
    color: '#B2B2B2',
  },
});
