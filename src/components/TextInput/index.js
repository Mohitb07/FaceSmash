import {View, TextInput, StyleSheet} from 'react-native';
import React from 'react';

const StyledTextInput = ({
  onChangeText = () => {},
  value = '',
  placeholder = '',
  icon,
  secure = false,
  error = false,
  multiline = false,
  numberOfLines = 1,
  customStyles,
  maxLength,
}) => {
  return (
    <View style={[styles.inputFieldContainer, error && styles.error]}>
      {icon}
      <TextInput
        placeholderTextColor="#BEBEBE"
        style={[styles.inputField, customStyles]}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
      />
    </View>
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  inputField: {
    flex: 1,
    borderWidth: 1.3,
    borderColor: '#252A34',
    borderRadius: 8,
    color: '#fff',
    padding: 10,
    backgroundColor: '#252A34',
  },
  inputFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#252A34',
    borderColor: '#252A34',
    borderWidth: 0.7,
    paddingHorizontal: 5,
    marginBottom: 4,
  },
  error: {
    borderColor: 'red',
  },
});
