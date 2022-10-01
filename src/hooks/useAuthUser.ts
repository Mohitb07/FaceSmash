import React, {useContext} from 'react'

import {AuthUserContext} from '@/Context/auth'

export default function useAuthUser() {
  const context = useContext(AuthUserContext)
  if (!context) {
    throw new Error('useAuthUser must be used within a AuthUserContextProvider')
  }
  return context
}
