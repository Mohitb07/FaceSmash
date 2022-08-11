import React, {memo} from 'react'
import {View, Text, StyleSheet, TextStyle} from 'react-native'

interface IStyledLabelProps {
  label: string
  labelStyle?: TextStyle
  required?: boolean
}

function StyledLabel({
  label,
  labelStyle = {},
  required = false,
}: IStyledLabelProps) {
  return (
    <View style={styles.container}>
      <Text style={[styles.labelText, labelStyle]}>{label}</Text>
      {required && <Text style={styles.sup}>*</Text>}
    </View>
  )
}
export default memo(StyledLabel)

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    marginBottom: 5,
  },

  labelText: {
    fontSize: 13,
    color: '#fff',
  },

  sup: {
    color: 'red',
    marginLeft: 4,
    fontSize: 12,
  },
})
