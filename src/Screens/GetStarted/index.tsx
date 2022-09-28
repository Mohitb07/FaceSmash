import React from 'react'
import {ImageBackground, StyleSheet} from 'react-native'

import {ArrowForwardIcon, Text as NText, View as NView} from 'native-base'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import LinearGradient from 'react-native-linear-gradient'

import StyledButton from '../../components/Button'
import {COLORS, FONTS, SIZES} from '../../constants'
import {RootStackParamList} from '../../Navigation/Root'

type GetStartedScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'GetStarted'
>
const GET_STARTED_SCREEN_ASSET = '../../../assets/getStarted.png'

const GetStarted: React.FC<GetStartedScreenNavigationProp> = ({
  navigation,
}: GetStartedScreenNavigationProp) => {
  function renderHeader() {
    return (
      <NView style={styles.headerContainer}>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="contain"
          source={require(GET_STARTED_SCREEN_ASSET)}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[COLORS.transparent, COLORS.black]}
            style={styles.linearGradient}>
            <NText style={styles.text}>Connect with</NText>
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
      </NView>
    )
  }

  function renderDetail() {
    return (
      <NView style={styles.footerContainer}>
        <NView>
          <NText style={styles.footerText}>
            Connect with your friends and family to see who’s around and what
            they’re up to.
          </NText>
        </NView>
        <NView pb="5">
          <StyledButton
            onPress={() => navigation.navigate('Login')}
            icon={<ArrowForwardIcon />}
            text="Get Started"
            bgColor={COLORS.white2}
            disabled={false}
            showRing={false}
          />
        </NView>
      </NView>
    )
  }
  return (
    <NView style={styles.container}>
      {renderHeader()}
      {renderDetail()}
    </NView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  headerContainer: {
    height: SIZES.height > 700 ? '65%' : '60%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: 200,
    justifyContent: 'flex-end',
    paddingHorizontal: SIZES.padding,
  },
  text: {
    width: '80%',
    color: COLORS.white,
    ...FONTS.largeTitle,
    lineHeight: 45,
    fontFamily: 'Lato-Medium',
  },
  footerContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    justifyContent: 'space-between',
  },
  footerText: {
    marginTop: SIZES.radius,
    width: '70%',
    color: COLORS.gray,
    ...FONTS.body3,
    fontFamily: 'Lato-Regular',
  },
})

export default GetStarted
