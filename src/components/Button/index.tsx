import React, {ReactElement} from 'react'

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native'

import {View} from 'native-base'
import {TextStyle} from 'react-native'
import {COLORS} from '../../constants'

interface Props {
  onPress: () => void
  text: string
  disabled?: boolean
  bgColor?: string
  icon?: ReactElement
  style?: TextStyle
  textStyle?: TextStyle
  loader?: boolean
  showRing?: boolean
}

const Button: React.FC<Props> = ({
  onPress = () => {},
  text = '',
  disabled = false,
  bgColor = '',
  icon,
  style: customStyle = {},
  textStyle,
  loader = false,
  showRing = true,
}: Props) => {
  return (
    <View
      borderColor={disabled || !showRing ? COLORS.transparent : COLORS.white2}
      padding="0.5"
      flexGrow={1}
      borderWidth="2"
      rounded="full"
      opacity={disabled ? 0.5 : 1}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.btn,
          bgColor.length > 0 && {backgroundColor: bgColor},
          customStyle,
        ]}
        onPress={onPress}>
        {icon && icon}
        {loader ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <Text style={[styles.btnText, textStyle]}>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
  btnText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Lato-Heavy',
    color: COLORS.transparentBlack7,
    marginHorizontal: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 50,
  },
})
