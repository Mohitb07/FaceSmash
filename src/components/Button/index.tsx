import React, {ReactElement, SVGProps} from 'react'

import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'

import {COLORS} from '../../constants'
import {PresenceTransition, View} from 'native-base'
import {TextStyle} from 'react-native'

interface Props {
  onPress: () => void
  text: string
  disabled: boolean
  color?: string
  icon?: ReactElement
  style?: object
  textStyle?: TextStyle
  loader?: boolean
  showRing?: boolean
  loadingText?: string
}

const Button: React.FC<Props> = ({
  onPress = () => {},
  text = '',
  disabled = false,
  color = '',
  icon,
  style: customStyle = {},
  textStyle,
  loader = false,
  showRing = true,
  loadingText = 'Loading...',
}: Props) => {
  return (
    <View
      borderColor={disabled || !showRing ? COLORS.transparent : COLORS.white2}
      padding="0.5"
      flexGrow={1}
      borderWidth="2"
      rounded="full">
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.btn,
          color.length > 0 && {backgroundColor: color},
          // disabled && styles.disabled,
          customStyle,
        ]}
        onPress={onPress}>
        {icon && icon}
        {loader ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          // <Text
          //   style={[
          //     styles.btnText,
          //     // disabled && styles.disabled,
          //     textStyle,
          //   ]}>
          //   {loadingText}
          // </Text>
          <Text
            style={[
              styles.btnText,
              // disabled && styles.disabled,
              textStyle,
            ]}>
            {text}
          </Text>
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
