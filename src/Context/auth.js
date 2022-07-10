// import React, {createContext, useState, useEffect} from 'react';
// import auth from '@react-native-firebase/auth';
// import {useRecoilState} from 'recoil'

// export const AuthContext = createContext();

// function AuthProvider({children}) {
//   // const [authUser, setAuthUser] = useState();
//   const [] = useRecoilState()
//   const [initializing, setInitializing] = useState(true);

//   console.log('auth User context render');

//   const value = React.useMemo(
//     () => ({authUser, initializing}),
//     [authUser, initializing],
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export default AuthProvider;

import React, {useEffect, useState, useCallback} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthUserContext = React.createContext();

const AuthUserProvider = props => {
  console.log('auth User context render');
  const [authUser, setAuth] = useState(null);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user) {
    setAuth(user);
    if (initializing) setInitializing(false);
  }

  let subscriber;
  useEffect(() => {
    subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const value = React.useMemo(
    () => ({
      authUser,
      initializing,
    }),
    [authUser, initializing],
  );
  return <AuthUserContext.Provider value={value} {...props} />;
};

export default AuthUserProvider;
