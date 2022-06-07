import React from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function useRegister() {
  const onRegisterAttempt = ({email = '', password = '', username = ''}) => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('inside user', user.user.metadata);
        firestore()
          .collection('Users')
          .doc(user.user.uid)
          .set({
            email: user.user.email,
            username: username,
            password: password,
            uid: user.user.uid,
            followers: [],
            followings: [],
            createdAt: user.user.metadata.creationTime,
            lastSignIn: user.user.metadata.lastSignInTime,
            profilePic:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG3eLpTAMWO-mtILepXLwg68-IChyGcXJgog&usqp=CAU',
          })
          .then(() => {
            console.log('User added!');
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return onRegisterAttempt;
}
