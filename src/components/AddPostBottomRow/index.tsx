import React from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'

import {Text, View} from 'native-base'

type AddPostBottomRowProps = {
  disabled: boolean
  onPress: () => void
  text: string
  children: React.ReactNode
}

export default function AddPostBottomRow({
  disabled = false,
  onPress,
  text = '',
  children,
}: AddPostBottomRowProps) {
  return (
    <View borderTopColor="gray.800" borderTopWidth="1" paddingY="3">
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={styles.bottomSectionRow}>
        {children}
        <Text
          color={disabled ? 'gray.700' : 'white'}
          ml="5"
          fontFamily="Lato-Regular"
          fontSize="md">
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomSectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
