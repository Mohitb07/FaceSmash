import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {authState, initializingState} from '../../../atoms/authAtom';
import {Actionsheet, Box, Text as NText} from 'native-base';
import {DocumentIcon, LogoutIcon, PrivacyIcon} from '../../../SVG';
import auth from '@react-native-firebase/auth';
import {bottomSheetState} from '../../../atoms/bottomSheetAtom';
import {postState} from '../../../atoms/postAtom';

const ProfileBottomSheet = () => {
  const authUser = useRecoilValue(authState);
  const setPostState = useResetRecoilState(postState);
  const setBottom = useResetRecoilState(bottomSheetState);

  const onLogoutAttempt = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('user logged out');
        setPostState();
        setBottom();
      })
      .catch(err => console.log('SIGN OUT ERROR', err));
  };

  return (
    <>
      <Box w="100%" h={60} px={4} justifyContent="center">
        <NText
          fontSize="20"
          color="gray.500"
          _dark={{
            color: 'gray.300',
          }}>
          Personal Settings
        </NText>
      </Box>
      <Actionsheet.Item style={styles.defaultStyle}>
        <TouchableOpacity style={styles.btnLogout}>
          <DocumentIcon style={{marginRight: 5}} />
          <Text style={{color: 'white', fontWeight: '600'}}>
            Settings and Privacy
          </Text>
        </TouchableOpacity>
      </Actionsheet.Item>
      <Actionsheet.Item style={styles.defaultStyle}>
        <TouchableOpacity style={styles.btnLogout}>
          <PrivacyIcon style={{marginRight: 5}} />
          <Text style={{color: 'white', fontWeight: '600'}}>
            Settings and Privacy
          </Text>
        </TouchableOpacity>
      </Actionsheet.Item>
      {!!authUser && (
        <Actionsheet.Item style={styles.defaultStyle}>
          <TouchableOpacity style={styles.btnLogout} onPress={onLogoutAttempt}>
            <LogoutIcon style={{marginRight: 5}} />
            <Text style={{color: 'red', fontWeight: '600'}}>Log Out</Text>
          </TouchableOpacity>
        </Actionsheet.Item>
      )}
    </>
  );
};

export default ProfileBottomSheet;

const styles = StyleSheet.create({
  btnLogout: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  defaultStyle: {
    backgroundColor: 'none',
  },
});
