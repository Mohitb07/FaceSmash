import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
} from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SIZES, FONTS} from '../../constants';

const GetStarted = ({navigation}) => {
  function renderHeader() {
    return (
      <View
        style={{
          height: SIZES.height > 700 ? '65%' : '60%',
        }}>
        <ImageBackground
          style={{flex: 1, justifyContent: 'flex-end'}}
          resizeMode="cover"
          source={{
            uri: 'https://firebasestorage.googleapis.com/v0/b/facesmash-8ff0b.appspot.com/o/get-started.jpg?alt=media&token=71ad1b15-0580-4e33-85fd-875bda07c7f0',
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            colors={[COLORS.transparent, COLORS.black]}
            style={{
              height: 200,
              justifyContent: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}>
            <Text
              style={{
                width: '80%',
                color: COLORS.white,
                ...FONTS.largeTitle,
                lineHeight: 45,
              }}>
              Connect with your friends
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  function renderDetail() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}>
        <Text
          style={{
            marginTop: SIZES.radius,
            width: '70%',
            color: COLORS.gray,
            ...FONTS.body3,
          }}>
          Connect with your friends and family to see who’s around and what
          they’re up to.
        </Text>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Button
            text="Get Started"
            onPress={() => navigation.navigate('Login')}
            color={COLORS.primary}
          />
        </View>
      </View>
    );
  }
  return (
    // <View
    //   style={{
    //     height: height > 700 ? '65%' : '60%',
    //   }}>
    //   <ImageBackground
    //     style={styles.image}
    //     source={{
    //       uri: 'https://firebasestorage.googleapis.com/v0/b/facesmash-8ff0b.appspot.com/o/get-started.jpg?alt=media&token=71ad1b15-0580-4e33-85fd-875bda07c7f0',
    //     }}>
    //     <LinearGradient
    //       start={{x: 0, y: 0}}
    //       end={{x: 0, y: 1}}
    //       colors={['transparent', '#000']}
    //       style={{
    //         height: 200,
    //         justifyContent: 'flex-end',
    //         paddingHorizontal: 24,
    //       }}>
    //       <Text
    //         style={{
    //           width: '80%',
    //           color: '#fff',
    //           fontFamily: 'Roboto-Black',
    //           fontSize: 40,
    //           lineHeight: 45,
    //         }}>
    //         Cooking a Delicious Food Easily
    //       </Text>
    //     </LinearGradient>

    //     <Button
    //       text="Get Started"
    //       onPress={() => navigation.navigate('Login')}
    //       color={colors.primaryColor}
    //     />
    //   </ImageBackground>
    // </View>
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      <StatusBar barStyle="dark-content" />

      {renderHeader()}
      {renderDetail()}
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   image: {
//     flex: 1,
//     padding: 10,
//     justifyContent: 'flex-end',
//     paddingVertical: 20,
//   },
//   textContainer: {
//     textAlign: 'center',
//     paddingHorizontal: 50,
//   },
//   heading: {
//     fontSize: 25,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 11,
//     marginBottom: 20,
//     textAlign: 'center',
//     lineHeight: 22,
//   },
//   btnText: {
//     textAlign: 'center',
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   btn: {
//     backgroundColor: '#0b59a2',
//     padding: 15,
//     borderRadius: 8,
//   },
// });

export default GetStarted;
