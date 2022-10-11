import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  GestureResponderEvent,
} from 'react-native'

import {COLORS, FONTS} from '@/constants'
import {BackIcon} from '@/SVG'

interface IHeaderProps {
  label: string
  onPress?: (event: GestureResponderEvent) => void
  hasBackButton?: boolean
  isDisabled?: boolean
  hasRightSection?: boolean
  isLoading?: boolean
  navigate: () => void
  rightIcon?: JSX.Element
  leftIcon?: JSX.Element
  bgColor?: string
}

const StyledHeader = ({
  label = '',
  onPress = () => {},
  hasBackButton = true,
  isDisabled = false,
  hasRightSection = false,
  isLoading = false,
  navigate,
  rightIcon,
  leftIcon,
  bgColor,
}: IHeaderProps) => {
  return (
    <View
      style={[
        styles.container,
        Boolean(bgColor) && {backgroundColor: bgColor},
      ]}>
      <TouchableOpacity onPress={navigate}>
        {hasBackButton && leftIcon ? leftIcon : <BackIcon />}
      </TouchableOpacity>
      <Text style={styles.headerText}>{label}</Text>
      {hasRightSection && (
        <TouchableOpacity disabled={isDisabled} onPress={onPress}>
          {isLoading ? <ActivityIndicator /> : rightIcon}
        </TouchableOpacity>
      )}
    </View>
  )
}

export default StyledHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: COLORS.mainBackground,
    alignItems: 'center',
    zIndex: 99,
  },
  headerText: {
    ...FONTS.normalTitle,
    color: COLORS.white,
    fontWeight: 'bold',
  },
})
