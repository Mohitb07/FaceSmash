import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {useResetRecoilState} from 'recoil';
import {Actionsheet, Box, Icon, Text as NText} from 'native-base';
import {DocumentIcon, GallaryIcon} from '../../../SVG';
import {bottomSheetState} from '../../../atoms/bottomSheetAtom';
import {postState} from '../../../atoms/postAtom';

const AddPostMoreBottomSheet = () => {
  return (
    <>
      <Box w="100%" h={60} px={4} justifyContent="center">
        <NText
          fontSize="20"
          color="gray.500"
          _dark={{
            color: 'gray.300',
          }}>
          Create post
        </NText>
      </Box>
      <Actionsheet.Item
        style={styles.defaultStyle}
        startIcon={<Icon as={GallaryIcon} mr="1" size="6" />}>
        <TouchableOpacity style={styles.btnLogout}>
          <NText color="white" fontWeight="semibold">
            Add Photo
          </NText>
        </TouchableOpacity>
      </Actionsheet.Item>
      <Actionsheet.Item
        style={styles.defaultStyle}
        startIcon={<Icon as={DocumentIcon} mr="1" size="6" />}>
        <TouchableOpacity style={styles.btnLogout}>
          <NText color="white" fontWeight="semibold">
            Add Link
          </NText>
        </TouchableOpacity>
      </Actionsheet.Item>
    </>
  );
};

export default AddPostMoreBottomSheet;

const styles = StyleSheet.create({
  btnLogout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultStyle: {
    backgroundColor: 'none',
  },
});
