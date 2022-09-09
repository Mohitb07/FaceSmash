import React from 'react'
import {ImageBackground, StatusBar, Text, View} from 'react-native'

import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import LinearGradient from 'react-native-linear-gradient'

import {ArrowForwardIcon, Text as NText, View as NView} from 'native-base'
import StyledButton from '../../components/Button'

import {COLORS, FONTS, SIZES} from '../../constants'
import {RootStackParamList} from '../../Navigation/Root'

type GetStartedScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'GetStarted'
>

const ASSET_PATH = '../../../assets/getStarted.png'

const GetStarted: React.FC<GetStartedScreenNavigationProp> = ({
  navigation,
}: GetStartedScreenNavigationProp) => {
  function renderHeader() {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? '65%' : '60%',
        }}>
        <ImageBackground
          style={{flex: 1, justifyContent: 'flex-end'}}
          resizeMode="contain"
          source={require(ASSET_PATH)}>
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
          justifyContent: 'space-between',
        }}>
        <View>
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
        </View>
        <NView pb="5">
          <StyledButton
            onPress={() => navigation.navigate('Login')}
            icon={<ArrowForwardIcon />}
            text="Get Started"
            color={COLORS.white2}
            disabled={false}
            showRing={false}
          />
        </NView>
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
