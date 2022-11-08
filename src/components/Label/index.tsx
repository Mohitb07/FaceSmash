import React from 'react'
import {StyleSheet, TextStyle} from 'react-native'

import {View, Text} from 'native-base'

import {COLORS, FONTS} from '@/constants'

interface StyledLabelProps {
  label: string
  labelStyle?: TextStyle
  required?: boolean
}

const StyledLabel: React.FC<StyledLabelProps> = ({
  label,
  labelStyle = {},
  required = false,
}) => {
  return (
    <View
      flexDirection="row"
      justifyContent="flex-start"
      style={styles.container}>
      <Text style={[styles.labelText, labelStyle]}>{label}</Text>
      {required && (
        <Text color={COLORS.red} style={styles.sup}>
          *
        </Text>
      )}
    </View>
  )
}
export default StyledLabel

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    marginBottom: 5,
  },
  labelText: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  sup: {
    marginLeft: 4,
    ...FONTS.body5,
  },
})
