import React from 'react'
import {
  TextInput as Input,
  StyleSheet,
  TextInputProps as BaseProps,
  TextStyle,
} from 'react-native'

import {View} from 'native-base'
import {COLORS} from '@/constants'
import StyledError from '../Error'

type TextInputProps = BaseProps & {
  value: string
  placeholder: string
  inputStyle?: TextStyle
  error?: string
  errorLabelStyle?: TextStyle
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  placeholder,
  onChangeText,
  inputStyle,
  error = '',
  errorLabelStyle,
  ...rest
}) => {
  return (
    <View>
      <Input
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput, error.length > 0 && styles.error, inputStyle]}
        {...rest}
      />
      <StyledError errorStyle={errorLabelStyle} message={error} />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 20,
    color: COLORS.white,
    borderColor: COLORS.transparent,
    borderWidth: 1,
  },
  error: {
    borderColor: COLORS.red,
    borderWidth: 1,
  },
})
export default TextInput
