import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FacebookIcon, GoogleIcon} from '../../SVG';
import Label from '../../components/Label';
import Button from '../../components/Button';
import StyledTextInput from '../../components/TextInput';
import {useRegister} from '../../hooks/register';
import {COLORS} from '../../constants';
import {FIREBASE_ERRORS} from '../../firebase/errors';
import StyledError from '../../components/Error';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [charactersLeft, setCharactersLeft] = useState(30);

  const {onRegisterAttempt, error, setError} = useRegister();

  const isDisabled =
    email.length === 0 ||
    password.length === 0 ||
    confirmPassword.length === 0 ||
    username.length === 0 ||
    password !== confirmPassword;

  const confirmPasswordErrorMsg =
    confirmPassword.length > 0 &&
    confirmPassword !== password &&
    'Password do not match';

  const signUpAttempt = () => {
    onRegisterAttempt({email, password, username});
  };

  useEffect(() => {
    setError(prev => ({
      ...prev,
      password: '',
    }));
  }, [password]);

  useEffect(() => {
    setError(prev => ({
      ...prev,
      email: '',
    }));
  }, [email]);

  const handleUsername = text => {
    if (text.length > 30) return;
    setUsername(text);
    setCharactersLeft(30 - text.length);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View>
        <View>
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Create an Account</Text>
            <Text style={styles.subtitle}>
              We're happy to see. You can Login and continue to use our platform
              or sign up today .
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Label label="Username" required />
            <StyledTextInput
              value={username}
              maxLength={30}
              onChangeText={handleUsername}
              placeholder="Your Username"
            />
            <StyledError
              // showErrorIcon={Boolean(error.username)}
              errorStyle={{
                color: charactersLeft > 0 ? 'white' : 'red',
                fontSize: 10,
                marginLeft: 15,
              }}
              message={`${charactersLeft} characters remaining`}
            />

            <Label label="Email" required />
            <StyledTextInput
              value={email}
              onChangeText={text => setEmail(text)}
              placeholder="@gmail.com"
            />
            <StyledError
              showErrorIcon={Boolean(error.email)}
              message={FIREBASE_ERRORS[error.email]}
            />

            <Label label="Password" required />
            <StyledTextInput
              secure={true}
              value={password}
              onChangeText={text => setPassword(text)}
              placeholder="Your Password"
            />
            <StyledError
              showErrorIcon={Boolean(error.password)}
              message={FIREBASE_ERRORS[error.password]}
            />

            <Label label="Confirm Password" required />
            <StyledTextInput
              secure={true}
              value={confirmPassword}
              onChangeText={text => setConfirmPassword(text)}
              placeholder="Confirm Your Password"
              error={Boolean(confirmPasswordErrorMsg)}
            />
            <StyledError
              showErrorIcon={Boolean(confirmPasswordErrorMsg)}
              message={confirmPasswordErrorMsg}
            />
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Button
            disabled={isDisabled}
            text="Sign Up"
            onPress={signUpAttempt}
            color={COLORS.neon}
          />
          <View style={styles.divider}>
            <View style={styles.line}></View>
            <Text style={styles.text}>or Sign in with</Text>
            <View style={styles.line}></View>
          </View>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialBtn}>
              <FacebookIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn}>
              <GoogleIcon />
            </TouchableOpacity>
          </View>
          <View style={styles.signupTextContainer}>
            <Text style={styles.text}>Already have an account ?</Text>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.signupText}>
              Sign In
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 25,
    backgroundColor: '#181920',
    justifyContent: 'space-between',
  },
  headingContainer: {},
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#BEBEBE',
    marginTop: 15,
  },
  inputContainer: {
    marginVertical: 25,
  },
  forgotPasswordText: {
    color: COLORS.neon,
    textAlign: 'right',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    marginVertical: 25,
    width: '30%',
    height: 1,
    backgroundColor: '#BEBEBE',
    marginHorizontal: 10,
  },
  text: {
    color: '#BEBEBE',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 8,
  },
  socialBtn: {
    backgroundColor: '#252A34',
    padding: 13,
    borderRadius: 50,
  },
  signupTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  signupText: {
    color: COLORS.neon,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
