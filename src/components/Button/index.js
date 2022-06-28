import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../constants';

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
        <ActivityIndicator />
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
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.transparentBlack7,
    marginHorizontal: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
  },
  disabled: {
    backgroundColor: '#000',
    color: '#B2B2B2',
  },
});
