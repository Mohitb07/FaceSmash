import {COLORS} from '@/constants'
import {View} from 'native-base'
import {InterfaceViewProps} from 'native-base/lib/typescript/components/basic/View/types'
import React from 'react'

interface ScreenProps extends InterfaceViewProps {
  children: React.ReactNode
}

const Screen: React.FC<ScreenProps> = ({children, ...rest}) => {
  return (
    <View flex={1} backgroundColor={COLORS.black} {...rest}>
      {children}
    </View>
  )
}
export default Screen
