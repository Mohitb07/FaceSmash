import React, {useEffect, useState, useContext, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
// import {AuthContext} from './auth';
import storage from '@react-native-firebase/storage';
import {useRecoilState} from 'recoil';
import {authState, initializingState} from '../atoms/authAtom';
import auth from '@react-native-firebase/auth';

export const UserDataContext = React.createContext();

const UserDataProvider = props => {
  console.log('user data context render');
  const [contextUser, setContextUser] = useState({});
  const [authUser, setAuth] = useRecoilState(authState);
  const [initializing, setInitializing] = useRecoilState(initializingState);

  function onAuthStateChanged(user) {
    setAuth(user);
    if (initializing) setInitializing(false);
  }

  let subscriber;
  useEffect(() => {
    subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    async function getData() {
      if (authUser) {
        const user = await firestore()
          .collection('Users')
          .doc(authUser?.uid)
          .get();
        setContextUser(user.data());
      }
    }
    getData();
  }, [authUser]);

  const updateUserData = useCallback((url, navigation, setLoading) => {
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
        setContextUser(updatedUser.data());
        const userRef = await firestore()
          .collection('Users')
          .doc(authUser.uid)
          .get();
        console.log('user ref ⚡⚡⚡⚡⚡', userRef);
        const allPosts = await firestore()
          .collection('Posts')
          .where('user', '==', authUser.uid)
          .orderBy('createdAt', 'desc')
          .get();

        const batch = firestore().batch();
        allPosts.forEach(doc => {
          const docRef = firestore().collection('Posts').doc(doc.id);
          batch.update(docRef, {
            userProfile: userRef.data().profilePic,
          });
        });
        batch.commit().then(() => {
          console.log('updated al docs');
          setLoading(false);
          navigation.replace('Profile', {
            providedUserId: authUser.uid,
          });
        });
      })
      .catch(error => {
        console.log('ERROR UPDATING USER', error);
        return null;
      });
  }, []);

  const value = React.useMemo(
    () => ({
      contextUser,
      updateUserData,
    }),
    [contextUser, updateUserData],
  );
  return <UserDataContext.Provider value={value} {...props} />;
};

export default UserDataProvider;
