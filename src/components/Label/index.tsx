import {COLORS, FONTS} from '@/constants'
import React from 'react'
import {View, Text, StyleSheet, TextStyle} from 'react-native'

interface IStyledLabelProps {
  label: string
  labelStyle?: TextStyle
  required?: boolean
}

const StyledLabel: React.FC<IStyledLabelProps> = ({
  label,
  labelStyle = {},
  required = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.labelText, labelStyle]}>{label}</Text>
      {required && <Text style={styles.sup}>*</Text>}
    </View>
  )
}
export default StyledLabel

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    marginBottom: 5,
  },
  labelText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  sup: {
    color: 'red',
    marginLeft: 4,
    ...FONTS.body5,
  },
})
