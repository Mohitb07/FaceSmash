import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {UserIcon, LockIcon, FacebookIcon, GoogleIcon} from '../../SVG';
import {AuthContext} from '../../Context/auth';
import Label from '../../components/Label';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = ({navigation}) => {
  const {setAuthenticatedUser} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const onRegisterAttempt = () => {
    setIsDisabled(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('inside user', user.user.metadata);
        firestore()
          .collection('Users')
          .doc(user.user.uid)
          .set({
            email: user.user.email,
            username: user.user.email.split('@')[0],
            password: password,
            uid: user.user.uid,
            followers: [],
            followings: [],
            createdAt: user.user.metadata.creationTime,
            lastSignIn: user.user.metadata.lastSignInTime,
          })
          .then(() => {
            setIsDisabled(false);
            console.log('User added!');
            setAuthenticatedUser(user);
          });
      })
      .catch(error => {
        setIsDisabled(false);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Welcome Back!</Text>
          <Text style={styles.subtitle}>
            We're happy to see. You can Login and continue consulting your
            problem or read some tips.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Label label="Email" required />
          <View style={styles.username}>
            <UserIcon />
            <TextInput
              placeholderTextColor="#BEBEBE"
              style={styles.inputField}
              placeholder="@gmail.com"
              value={email}
              onChangeText={text => setEmail(text)}
            />
          </View>
          <Label label="Password" required />
          <View style={[styles.username]}>
            <LockIcon />
            <TextInput
              placeholderTextColor="#BEBEBE"
              style={styles.inputField}
              placeholder="password"
              secureTextEntry
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <TouchableOpacity
          disabled={isDisabled}
          style={styles.btn}
          onPress={onRegisterAttempt}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
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
          <Text style={styles.text}>Already Created ?</Text>
          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.signupText}>
            Sign In
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
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
    marginTop: 25,
  },
  inputField: {
    flex: 1,
    borderWidth: 1.3,
    borderColor: '#252A34',
    borderRadius: 8,
    color: '#fff',
    padding: 10,
    backgroundColor: '#252A34',
  },
  username: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#252A34',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#0b59a2',
    textAlign: 'right',
  },
  btnText: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  btn: {
    backgroundColor: '#0b59a2',
    padding: 15,
    borderRadius: 8,
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
    color: '#0b59a2',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
