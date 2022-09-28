import React, {useContext} from 'react'

import {UserDataContext} from '../Context/userData'

export default function useUserData() {
  const context = useContext(UserDataContext)
  if (!context) {
    throw new Error('useUserData must be used within a UserDataContextProvider')
  }
  return context
}
