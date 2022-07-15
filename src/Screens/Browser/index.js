import React from 'react';

import {WebView} from 'react-native-webview';

const Browser = ({route}) => {
  const {uri} = route?.params || '';
  return <WebView source={{uri: uri}} />;
};

export default Browser;
