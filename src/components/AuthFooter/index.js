import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';

import {FacebookIcon, GoogleIcon} from '../../SVG';
import {COLORS} from '../../constants';

const Footer = ({navigation, navigationText, navigateTo, description}) => {
  return (
    <View>
      <View style={styles.divider}>
        <View style={styles.line}></View>
        <Text style={styles.text}>or Sign in with</Text>
        <View style={styles.line}></View>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialBtn}>
          <FacebookIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn}>
          <GoogleIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextContainer}>
        <Text style={styles.text}>{description}</Text>
        <Text
          onPress={() => navigation.navigate(navigateTo)}
          style={styles.signupText}>
          {navigationText}
        </Text>
      </View>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    marginVertical: 25,
    width: '30%',
    height: 1,
    backgroundColor: '#BEBEBE',
    marginHorizontal: 10,
  },
  text: {
    color: '#BEBEBE',
    fontFamily: 'Lato-Regular',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  socialBtn: {
    backgroundColor: '#252A34',
    padding: 13,
    borderRadius: 50,
  },
  signupTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  signupText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginLeft: 5,
    fontFamily: 'Lato-Semibold',
  },
});
