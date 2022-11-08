import React from 'react'
import {StyleSheet, TextStyle} from 'react-native'

import {InfoOutlineIcon, Text, View} from 'native-base'

interface Props {
  errorStyle?: TextStyle
  showErrorIcon?: boolean
  message: string
}

export default function StyledError({
  errorStyle,
  showErrorIcon = false,
  message,
}: Props) {
  return (
    <View flexDirection="row" alignItems="center" style={styles.errorContainer}>
      {showErrorIcon && <InfoOutlineIcon style={styles.errorIcon} />}
      <Text fontFamily="Lato-Medium" style={[styles.error, errorStyle]}>
        {message}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    marginLeft: 3,
    marginTop: 2,
  },
  error: {
    fontSize: 13,
    color: 'red',
    marginLeft: 5,
  },
  errorIcon: {
    marginRight: 8,
    color: 'red',
  },
})
