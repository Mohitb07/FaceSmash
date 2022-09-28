import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native'

type TextInputProps = {
  onChangeText: (text: string) => void
  value: string | undefined
  placeholder: string
  icon?: any
  secure?: boolean
  error?: boolean
  multiline?: boolean
  numberOfLines?: number
  customStyles?: TextStyle
  maxLength?: number
  rounded?: TextStyle
}

const StyledTextInput = ({
  onChangeText = () => {},
  value = '',
  placeholder = '',
  icon,
  secure = false,
  error = false,
  multiline = false,
  numberOfLines = 1,
  customStyles = {},
  maxLength,
  rounded,
}: TextInputProps) => {
  return (
    <View
      style={[
        styles.inputFieldContainer,
        rounded && rounded,
        error && styles.error,
      ]}>
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
      <TouchableOpacity style={{marginRight: 15}}>{icon}</TouchableOpacity>
    </View>
  )
}

export default StyledTextInput

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
})
