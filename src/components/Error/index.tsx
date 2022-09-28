import React from 'react'
import {Text, View, StyleSheet, TextStyle} from 'react-native'

import {InfoOutlineIcon} from 'native-base'

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
    <View style={styles.errorContainer}>
      {showErrorIcon && <InfoOutlineIcon style={styles.errorIcon} />}
      <Text style={[styles.error, errorStyle]}>{message}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
    marginTop: 2,
  },

  error: {
    fontSize: 13,
    color: 'red',
    fontFamily: 'Lato-Medium',
    marginLeft: 5,
  },

  errorIcon: {
    marginRight: 8,
    color: 'red',
  },
})
