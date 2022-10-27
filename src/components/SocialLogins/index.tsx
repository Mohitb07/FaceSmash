import React from 'react'
import {TouchableOpacity} from 'react-native'

import {Divider, HStack} from 'native-base'
import {FacebookIcon, GoogleIcon} from '@/SVG'

const SocialLogins: React.FC = () => {
  return (
    <HStack justifyContent="center" space="10" alignItems="center">
      <TouchableOpacity>
        <GoogleIcon />
      </TouchableOpacity>
      <Divider thickness="1" mx="2" orientation="vertical" />
      <TouchableOpacity>
        <FacebookIcon />
      </TouchableOpacity>
    </HStack>
  )
}
export default SocialLogins
