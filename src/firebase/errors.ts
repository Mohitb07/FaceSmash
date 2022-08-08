export const FIREBASE_ERRORS = {
  '[auth/email-already-in-use] The email address is already in use by another account.':
    'A user with that email already exists',

  '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.':
    'Invalid Email or Password',

  '[auth/wrong-password] The password is invalid or the user does not have a password.':
    'Invalid email or password',

  '[auth/invalid-email] The email address is badly formatted.': 'Invalid email',

  '[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]':
    'Password should be at least 6 characters',
}
