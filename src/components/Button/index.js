import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

const Button = ({
  onPress = () => {},
  text = '',
  disabled = false,
  color = '',
  icon,
  style: customStyle = {},
  loader = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.btn,
        color && {backgroundColor: color},
        disabled && styles.disabled,
        customStyle,
      ]}
      onPress={onPress}>
      {icon && icon}
      {loader ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.btnText, disabled && styles.disabled]}>
          {text}
        </Text>
      )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0b59a2',
    padding: 15,
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: '#063561',
    color: '#B2B2B2',
  },
});
