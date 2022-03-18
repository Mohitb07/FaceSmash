import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

function StyledLabel({
  label,
  labelStyle = {},
  required = false,
  labelFontWeight = '500',
}) {
  return (
    <View style={styles.container}>
      <Text
        style={[styles.labelText, {fontWeight: labelFontWeight}, labelStyle]}>
        {label}
      </Text>
      {required && <Text style={styles.sup}>*</Text>}
    </View>
  );
}
export default memo(StyledLabel);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 12,
    marginBottom: 5,
  },

  labelText: {
    fontSize: 12,
    color: '#fff',
  },

  sup: {
    color: 'red',
    marginLeft: 4,
    fontSize: 12,
  },
});
