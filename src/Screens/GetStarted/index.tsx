import React from 'react'
import {ImageBackground, StyleSheet} from 'react-native'

import {ArrowForwardIcon, Text, View} from 'native-base'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import LinearGradient from 'react-native-linear-gradient'

import StyledButton from '@/components/Button'
import {COLORS, FONTS, SIZES} from '@/constants'
import {RootStackParamList} from '@/Navigation/Root'
import Brand from '@/components/BrandText'
import Screen from '@/components/Screen'

type GetStartedScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'GetStarted'
>
const GET_STARTED_SCREEN_ASSET = '../../../assets/getStarted.png'

const GetStarted: React.FC<GetStartedScreenNavigationProp> = ({
  navigation,
}: GetStartedScreenNavigationProp) => {
  return (
    <Screen>
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.imageBackground}
          resizeMode="contain"
          source={require(GET_STARTED_SCREEN_ASSET)}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[COLORS.transparent, COLORS.black]}
            style={styles.linearGradient}>
            <Text style={styles.text}>Connect with</Text>
            <Brand size="4xl" />
          </LinearGradient>
        </ImageBackground>
      </View>

      <View
        flex={1}
        style={styles.footerContainer}
        justifyContent="space-between">
        <View>
          <Text
            fontFamily="Lato-Regular"
            style={styles.footerText}
            color={COLORS.gray}>
            Connect with your friends and family to see who’s around and what
            they’re up to.
          </Text>
        </View>
        <View pb="5">
          <StyledButton
            onPress={() => navigation.navigate('Login')}
            icon={<ArrowForwardIcon />}
            text="Get Started"
            bgColor={COLORS.white2}
            disabled={false}
            showRing={false}
          />
        </View>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
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
    paddingHorizontal: SIZES.padding,
  },
  footerText: {
    marginTop: SIZES.radius,
    width: '70%',
    ...FONTS.body3,
  },
})

export default GetStarted
