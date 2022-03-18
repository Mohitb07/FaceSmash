import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

function AuthProvider({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setLoginState = value => {
    setIsLoggedIn(value);
  };
  return (
    <AuthContext.Provider value={{isLoggedIn, setLoginState}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
