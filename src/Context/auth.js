import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

function AuthProvider({children}) {
  const [initializing, setInitializing] = useState(true);
  const [authUser, setAuthUser] = useState(null);

  // function onAuthStateChanged(authUser) {
  //   setAuthUser(authUser);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber;
  // }, []);

  const setAuthenticatedUser = value => {
    setAuthUser(value);
  };

  if (!authUser) {
    console.log('user not authenticated');
  }

  if (authUser) {
    console.log('user is authenticated', authUser);
  }
  return (
    <AuthContext.Provider value={{authUser, setAuthenticatedUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
