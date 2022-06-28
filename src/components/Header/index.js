import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
// import {ArrowBackIcon, CheckIcon} from 'native-base';
import {COLORS} from '../../constants';
import {BackIcon} from '../../SVG';

const StyledHeader = ({
  label = '',
  onPress = () => {},
  showBackButton = false,
  disabled = false,
  rightSection = false,
  loading = false,
  navigation,
  rightIcon,
  leftIcon,
  bgColor,
}) => {
  return (
    <View style={[styles.container, bgColor && {backgroundColor: bgColor}]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {showBackButton && leftIcon ? leftIcon : <BackIcon />}
      </TouchableOpacity>
      <Text style={styles.headerText}>{label}</Text>
      {rightSection && (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
          {loading ? <ActivityIndicator /> : rightIcon}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StyledHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: COLORS.mainBackground,
    alignItems: 'center',
    borderBottomColor: COLORS.white2,
    borderBottomWidth: 0.2,
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
