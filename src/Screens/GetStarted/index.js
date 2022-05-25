import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Button from '../../components/Button';

const GetStarted = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={{
          uri: 'https://cdn.stocksnap.io/img-thumbs/280h/blue-abstract_1K7APBPQKU.jpg',
        }}>
        <View style={styles.textContainer}>
          <Text style={styles.heading}>abda</Text>
          <Text style={styles.text}>
            lorem ipsum fasdfasdf rqerqwerqwerqwerwerqwerewr lorem ipsum
            fasdfasdf rqerqwerqwerqwerwerqwerewr lorem ipsum fasdfasdf
          </Text>
        </View>
        <Button
          text="Get Started"
          onPress={() => navigation.navigate('Login')}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
    paddingVertical: 20,
  },
  textContainer: {
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  heading: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    color: '#fff',
    fontSize: 11,
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
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
});

export default GetStarted;
