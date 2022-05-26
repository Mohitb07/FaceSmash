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
      const user = await firestore()
        .collection('Users')
        .doc(authUser?.uid)
        .get();
      setUserData(user.data());
    }
    getData();
  }, [authUser]);

  return <UserDataContext.Provider value={{userData}} {...props} />;
};

export default UserDataProvider;
