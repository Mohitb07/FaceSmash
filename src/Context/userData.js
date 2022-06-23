import React, {useEffect, useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from './auth';

export const UserDataContext = React.createContext();

const UserDataProvider = props => {
  const [userData, setUserData] = useState({});
  const {authUser} = useContext(AuthContext);

  useEffect(() => {
    console.log('calling effect');
    async function getData() {
      if (authUser) {
        const user = await firestore()
          .collection('Users')
          .doc(authUser?.uid)
          .get();
        setUserData(user.data());
      }
    }
    getData();
  }, [authUser]);

  const updateUserData = (url, navigation, setLoading) => {
    firestore()
      .collection('Users')
      .doc(authUser.uid)
      .update({
        profilePic: url,
      })
      .then(async () => {
        const updatedUser = await firestore()
          .collection('Users')
          .doc(authUser.uid)
          .get();
        setLoading(false);
        setUserData(updatedUser.data());
        navigation.navigate('Profile');
      })
      .catch(error => {
        console.log('ERROR UPDATING USER', error);
        return null;
      });
  };

  return (
    <UserDataContext.Provider value={{userData, updateUserData}} {...props} />
  );
};

export default UserDataProvider;
