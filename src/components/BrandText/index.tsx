import React from 'react'

import {Text, View} from 'native-base'
import {ResponsiveValue} from 'native-base/lib/typescript/components/types'

import {COLORS} from '@/constants'

type BrandProps = {
  size: ResponsiveValue<
    | number
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '2xs'
    | 'xs'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
    | (string & {})
  >
}

const Brand: React.FC<BrandProps> = ({size}) => {
  return (
    <View alignItems="center" flexDirection="row">
      <Text fontFamily="Lato-Bold" color={COLORS.primary} fontSize={size}>
        Face
        <Text fontFamily="Lato-Bold" color={COLORS.white2} fontSize={size}>
          Smash
        </Text>
      </Text>
      <View
        ml="4"
        bgColor="primary.800"
        height="3"
        width="3"
        fontFamily="Lato-Bold"
        rounded="full"
      />
    </View>
  )
}
export default Brand
