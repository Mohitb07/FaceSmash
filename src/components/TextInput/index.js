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
}) => {
  return (
    <View style={styles.username}>
      {icon}
      <TextInput
        placeholderTextColor="#BEBEBE"
        style={[styles.inputField, error && styles.error, customStyles]}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secure}
        onChangeText={onChangeText}
        multiline={multiline}
        numberOfLines={numberOfLines}
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
  username: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#252A34',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  error: {
    borderColor: 'red',
  },
});
