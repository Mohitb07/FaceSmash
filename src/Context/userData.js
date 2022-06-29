import React, {useEffect, useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from './auth';
import storage from '@react-native-firebase/storage';

export const UserDataContext = React.createContext();

const UserDataProvider = props => {
  const [contextUser, setContextUser] = useState({});
  const {authUser} = useContext(AuthContext);

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
  };

  return (
    <UserDataContext.Provider
      value={{contextUser, updateUserData}}
      {...props}
    />
  );
};

export default UserDataProvider;
