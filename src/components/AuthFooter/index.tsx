import React from 'react'

import {Text} from 'native-base'
import {useNavigation} from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'

import {RootStackParamList} from '@/Navigation/Root'

type AuthScreenNavigationLinkProps = {
  screen: keyof RootStackParamList
  screenLabel: string
  subtitle: string
}

const AuthScreenNavigationLink: React.FC<AuthScreenNavigationLinkProps> = ({
  screen,
  screenLabel,
  subtitle,
}) => {
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  return (
    <Text
      fontFamily="Lato-Regular"
      mt="8"
      textAlign="center"
      alignItems="center">
      {subtitle}{' '}
      <Text
        onPress={() => navigate(screen)}
        mt="10"
        fontFamily="Lato-Bold"
        color="primary.400">
        {screenLabel}
      </Text>
    </Text>
  )
}
export default AuthScreenNavigationLink
