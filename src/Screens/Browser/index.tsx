import React from 'react'

import {RouteProp} from '@react-navigation/native'
import {WebView} from 'react-native-webview'

const Browser = ({
  route,
}: {
  route: RouteProp<{params: {uri: string}}, 'params'>
}) => {
  const {uri} = route?.params || ''
  return <WebView source={{uri: uri}} />
}

export default Browser
