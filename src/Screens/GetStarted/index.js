import React from 'react'
import {ImageBackground, StatusBar, Text, View} from 'react-native'

import {Button, Text as NText, View as NView} from 'native-base'
import LinearGradient from 'react-native-linear-gradient'

// import Button from '../../components/Button';
import {COLORS, FONTS, SIZES} from '../../constants'

const GetStarted = ({navigation}) => {
  function renderHeader() {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? '65%' : '60%',
        }}>
        <ImageBackground
          style={{flex: 1, justifyContent: 'flex-end'}}
          resizeMode="contain"
          source={require('../../../assets/giving-rupiah-coin.png')}>
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
                fontFamily: 'Lato-Medium',
              }}>
              Connect with
            </Text>
            <NView alignItems="center" flexDirection="row">
              <NText
                fontFamily="Lato-Bold"
                color={COLORS.primary}
                fontSize="4xl">
                Face
                <NText
                  fontFamily="Lato-Bold"
                  color={COLORS.white2}
                  fontSize="4xl">
                  Smash
                </NText>
              </NText>
              <NView
                ml="4"
                bgColor={COLORS.primary}
                height="3"
                width="3"
                fontFamily="Lato-Bold"
                rounded="full"></NView>
            </NView>
          </LinearGradient>
        </ImageBackground>
      </View>
    )
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
            fontFamily: 'Lato-Regular',
          }}>
          Connect with your friends and family to see who’s around and what
          they’re up to.
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <NView
            borderColor={COLORS.white2}
            borderWidth={2}
            padding="0.5"
            rounded="full">
            <Button
              height="12"
              borderRadius="full"
              backgroundColor={COLORS.white2}
              borderColor={COLORS.white2}
              onPress={() => navigation.navigate('Login')}
              _text={{
                color: COLORS.background,
                fontFamily: 'Lato-Black',
              }}>
              Get Started
            </Button>
          </NView>
        </View>
      </View>
    )
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
  )
}

export default GetStarted
