import React from 'react';
import {ImageBackground, StatusBar, Text, View} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Button from '../../components/Button';
import {COLORS, FONTS, SIZES} from '../../constants';

const GetStarted = ({navigation}) => {
  function renderHeader() {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? '65%' : '60%',
        }}>
        <ImageBackground
          style={{flex: 1, justifyContent: 'flex-end'}}
          resizeMode="cover"
          source={require('../../assets/getStartedBg.jpg')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}>
            <Text
              style={{
                width: '80%',
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
              }}>
              Connect with your friends
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  function renderDetail() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            marginTop: SIZES.radius,
            width: '70%',
            color: COLORS.gray,
            ...FONTS.body3,
          }}>
          Connect with your friends and family to see who’s around and what
          they’re up to.
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Button
            text="Get Started"
            onPress={() => navigation.navigate('Login')}
            color={COLORS.neon}
          />
        </View>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <StatusBar barStyle="default" />

      {renderHeader()}
      {renderDetail()}
    </View>
  );
};

export default GetStarted;
