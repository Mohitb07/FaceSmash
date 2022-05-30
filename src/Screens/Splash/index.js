import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {COLORS} from '../../constants';

const SplashScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <LottieView
        source={require('../../assets/65926-social-media.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default SplashScreen;
