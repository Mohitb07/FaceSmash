import React, {useEffect, useState, useContext, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthUserContext} from './auth';

export const UserDataContext = React.createContext();

const UserDataProvider = props => {
  console.log('user data context render');
  const [contextUser, setContextUser] = useState(null);
  const {authUser} = useContext(AuthUserContext);

  // function onAuthStateChanged(user) {
  //   setAuth(user);
  //   if (initializing) setInitializing(false);
  // }

  // let subscriber;
  // useEffect(() => {
  //   subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

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

  console.log('authUser outside', authUser);

  const updateUserData = useCallback(
    async (url, navigation, setLoading, userId) => {
      console.log('authuser insdier', userId);
      if (userId) {
        const userRef = firestore().collection('Users').doc(userId);

        await userRef.update({
          profilePic: url,
        });
        const batch = firestore().batch();

        const updatedUser = await firestore()
          .collection('Users')
          .doc(userId)
          .get();

        console.log('updated User', updatedUser);

        const allPosts = await firestore()
          .collection('Posts')
          .where('user', '==', userId)
          .orderBy('createdAt', 'desc')
          .get();

        allPosts.docs.forEach(doc => {
          const docRef = firestore().collection('Posts').doc(doc.id);
          batch.update(docRef, {
            userProfile: updatedUser.data().profilePic,
          });
        });

        batch
          .commit()
          .then(() => {
            setLoading(false);
            setContextUser(updatedUser.data());
            navigation.navigate('Profile', {
              providedUserId: userId,
            });
          })
          .catch(err => {
            throw Error(err.message);
          });
      }

      // const updatedUserRef = await firestore()
      //   .collection('Users')
      //   .doc(authUser?.uid)
      //   .get();

      // const allPosts = await firestore()
      //   .collection('Posts')
      //   .where('user', '==', authUser?.uid)
      //   .orderBy('createdAt', 'desc')
      //   .get();

      // const batch = firestore().batch();
      // allPosts.docs.forEach(doc => {
      //   const docRef = firestore().collection('Posts').doc(doc.id);
      //   batch.update(docRef, {
      //     userProfile: updatedUserRef.data().profilePic,
      //   });
      // });

      // batch
      //   .commit()
      //   .then(() => {
      //     setLoading(false);
      //     navigation.navigate('Profile', {
      //       providedUserId: authUser?.uid,
      //     });
      //   })
      //   .catch(err => {
      //     throw Error(err.message);
      //   });

      // firestore()
      //   .collection('Users')
      //   .doc(authUser?.uid)
      //   .update({
      //     profilePic: url,
      //   })
      //   .then(async () => {
      //     const updatedUser = await firestore()
      //       .collection('Users')
      //       .doc(authUser?.uid)
      //       .get();
      //     setContextUser(updatedUser.data());
      //     const userRef = await firestore()
      //       .collection('Users')
      //       .doc(authUser?.uid)
      //       .get();
      //     console.log('user ref ⚡⚡⚡⚡⚡', userRef);
      //     const allPosts = await firestore()
      //       .collection('Posts')
      //       .where('user', '==', authUser?.uid)
      //       .orderBy('createdAt', 'desc')
      //       .get();

      //     const batch = firestore().batch();
      //     allPosts.forEach(doc => {
      //       const docRef = firestore().collection('Posts').doc(doc.id);
      //       batch.update(docRef, {
      //         userProfile: userRef.data().profilePic,
      //       });
      //     });
      //     batch.commit().then(() => {
      //       console.log('updated al docs');
      //       setLoading(false);
      //       navigation.replace('Profile', {
      //         providedUserId: authUser?.uid,
      //       });
      //     });
      //   })
      //   .catch(error => {
      //     console.log('ERROR UPDATING USER', error);
      //     return null;
      //   });
    },
    [],
  );

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
