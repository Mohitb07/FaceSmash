import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {COLORS} from '../../constants';

const Browser = ({route, navigation}) => {
  const {uri} = route?.params || '';
  return <WebView source={{uri: uri}} />;
};

export default Browser;
