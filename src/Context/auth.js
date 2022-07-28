import React, {useEffect, useState, useCallback} from 'react';

import auth from '@react-native-firebase/auth';

export const AuthUserContext = React.createContext();

const AuthUserProvider = props => {
  const [authUser, setAuth] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = useCallback(function onAuthStateChanged(user) {
    setAuth(user);
    if (initializing) setInitializing(false);
  }, []);

  let subscriber;
  useEffect(() => {
    subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  console.log('authUser is', authUser);

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
