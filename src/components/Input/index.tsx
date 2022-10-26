import React from 'react'
import {
  TextInput as Input,
  StyleSheet,
  TextInputProps as BaseProps,
} from 'react-native'

import {View} from 'native-base'
import {COLORS} from '@/constants'
import StyledError from '../Error'

type TextInputProps = BaseProps & {
  value: string
  placeholder: string
  error?: string
  errorMessage?: string
  isInvalid?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  placeholder,
  error = '',
  isInvalid,
  errorMessage,
  onChangeText,
  ...rest
}) => {
  return (
    <View>
      <Input
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        value={value}
        onChangeText={onChangeText}
        style={[styles.textInput, error.length > 0 && styles.error]}
        {...rest}
      />
      <StyledError message={(isInvalid && errorMessage) || error} />
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
