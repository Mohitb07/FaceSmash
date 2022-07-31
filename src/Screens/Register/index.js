import React from 'react'
import Register from './Register'

const SignUp = ({navigation}) => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [username, setUsername] = useState('');
  // const [charactersLeft, setCharactersLeft] = useState(30);

  // const {onRegisterAttempt, error, setError, loading} = useRegister();

  // const isDisabled =
  //   email.length === 0 ||
  //   password.length === 0 ||
  //   confirmPassword.length === 0 ||
  //   username.length === 0 ||
  //   password !== confirmPassword;

  // const confirmPasswordErrorMsg =
  //   confirmPassword.length > 0 &&
  //   confirmPassword !== password &&
  //   'Password do not match';

  // const signUpAttempt = () => {
  //   onRegisterAttempt({email, password, username});
  // };

  // useEffect(() => {
  //   setError(prev => ({
  //     ...prev,
  //     password: '',
  //   }));
  // }, [password]);

  // useEffect(() => {
  //   setError(prev => ({
  //     ...prev,
  //     email: '',
  //   }));
  // }, [email]);

  // const handleUsername = text => {
  //   if (text.length > 30) return;
  //   setUsername(text);
  //   setCharactersLeft(30 - text.length);
  // };

  return (
    // <ScrollView
    //   contentContainerStyle={styles.container}
    //   showsVerticalScrollIndicator={false}>
    //   <View>
    //     <View>
    //       <View style={styles.headingContainer}>
    //         <Text style={styles.heading}>Create an Account</Text>
    //         <Text style={styles.subtitle}>
    //           We're happy to see. You can Login and continue to use our platform
    //           or sign up today .
    //         </Text>
    //       </View>
    //       <View style={styles.inputContainer}>
    //         <Label label="Username" required />
    //         <StyledTextInput
    //           value={username}
    //           maxLength={30}
    //           onChangeText={handleUsername}
    //           placeholder="Your Username"
    //         />
    //         <StyledError
    //           errorStyle={{
    //             color: charactersLeft > 0 ? 'white' : 'red',
    //             fontSize: 10,
    //             marginLeft: 15,
    //           }}
    //           message={`${charactersLeft} characters remaining`}
    //         />

    //         <Label label="Email" required />
    //         <StyledTextInput
    //           value={email}
    //           onChangeText={text => setEmail(text)}
    //           placeholder="@gmail.com"
    //         />
    //         <StyledError
    //           showErrorIcon={Boolean(error.email)}
    //           message={FIREBASE_ERRORS[error.email]}
    //         />

    //         <Label label="Password" required />
    //         <StyledTextInput
    //           secure={true}
    //           value={password}
    //           onChangeText={text => setPassword(text)}
    //           placeholder="Your Password"
    //         />
    //         <StyledError
    //           showErrorIcon={Boolean(error.password)}
    //           message={FIREBASE_ERRORS[error.password]}
    //         />

    //         <Label label="Confirm Password" required />
    //         <StyledTextInput
    //           secure={true}
    //           value={confirmPassword}
    //           onChangeText={text => setConfirmPassword(text)}
    //           placeholder="Confirm Your Password"
    //           error={Boolean(confirmPasswordErrorMsg)}
    //         />
    //         <StyledError
    //           showErrorIcon={Boolean(confirmPasswordErrorMsg)}
    //           message={confirmPasswordErrorMsg}
    //         />
    //       </View>
    //     </View>
    //     <View style={styles.footerContainer}>
    //       <Button
    //         height="12"
    //         backgroundColor={isDisabled ? 'primary.900' : 'primary.500'}
    //         borderRadius="full"
    //         _text={{
    //           color: '#1F2937',
    //           fontWeight: 700,
    //         }}
    //         disabled={isDisabled}
    //         isLoading={loading}
    //         onPress={signUpAttempt}
    //         isLoadingText="Signing Up">
    //         Sign Up
    //       </Button>
    //       <AuthFooter
    //         navigation={navigation}
    //         navigateTo="Login"
    //         navigationText="Sign Up"
    //         description="Already a member ?"
    //       />
    //     </View>
    //   </View>
    // </ScrollView>
    <Register navigation={navigation} />
  )
}

export default SignUp
