import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {COLORS} from '../../constants';
import {View} from 'native-base';

const Button = ({
  onPress = () => {},
  text = '',
  disabled = false,
  color = '',
  icon,
  style: customStyle = {},
  textStyle: customTextStyle = [],
  loader = false,
}) => {
  return (
    <View
      borderColor={disabled ? COLORS.transparent : COLORS.white2}
      padding="0.5"
      borderWidth="2"
      rounded="full">
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.btn,
          color && {backgroundColor: color},
          disabled && styles.disabled,
          customStyle,
        ]}
        onPress={onPress}>
        {icon && icon}
        {loader ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : (
          <Text
            style={[
              styles.btnText,
              disabled && styles.disabled,
              customTextStyle,
            ]}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'Lato-Semibold',
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
});
