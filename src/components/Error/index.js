import {InfoOutlineIcon} from 'native-base';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default function StyledError({
  errorStyle,
  showErrorIcon = false,
  message,
  type = 'info',
}) {
  return (
    <View style={[styles.errorContainer, errorStyle]}>
      {showErrorIcon && <InfoOutlineIcon style={styles.errorIcon} />}
      <Text style={styles.error}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },

  error: {
    fontSize: 13,
    color: 'red',
  },

  errorIcon: {
    marginRight: 8,
    color: 'red',
  },
});
