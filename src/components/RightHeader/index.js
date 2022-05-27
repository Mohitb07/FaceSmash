import {TouchableOpacity} from 'react-native';
import React from 'react';

const RightHeaderSection = ({onOpen, icon}) => {
  return <TouchableOpacity onPress={onOpen}>{icon}</TouchableOpacity>;
};

export default RightHeaderSection;
