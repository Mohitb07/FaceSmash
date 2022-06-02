import React, {createContext, useState, useEffect} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

function AuthProvider({children}) {
  const [authUser, setAuthUser] = useState();
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(authUser) {
    setAuthUser(authUser);
    if (initializing) setInitializing(false);
  }

  let subscriber;
  useEffect(() => {
    setTimeout(() => {
      subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    }, 3000);
    return subscriber;
  }, []);

  // const setAuthenticatedUser = value => {
  //   setAuthUser(value);
  // };

  console.log('authuser', authUser);

  if (authUser) {
    console.log('user is authenticated');
  }
  return (
    <AuthContext.Provider value={{authUser, initializing}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
