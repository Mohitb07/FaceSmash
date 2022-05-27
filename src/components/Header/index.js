import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {ArrowBackIcon, CheckIcon} from 'native-base';
import {COLORS} from '../../constants';

const StyledHeader = ({
  label = '',
  onPress = () => {},
  showBackButton = false,
  disabled = false,
  rightSection = false,
  loading = false,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        {showBackButton && <ArrowBackIcon />}
      </TouchableOpacity>
      <Text style={styles.headerText}>{label}</Text>
      {rightSection && (
        <TouchableOpacity disabled={disabled} onPress={onPress}>
          {loading ? <ActivityIndicator /> : <CheckIcon />}
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
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
