import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default function WelcomeScreen() {
  const animatedScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  const handleOnPress = () => {
    animatedScale.setValue(0.8);
    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 24,
      speed: 20,
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
    <Text style={styles.heading}>WEBFOOT</Text>
    <Text style={styles.subheading}>Give your child the joy to experience the beauty of extinct animals through this AR based app.</Text>
      <Image
        source={require('../assets/homybaba-removebg-preview.png')}
        style={styles.boy}
      />
      <Pressable onPress={handleOnPress}>
        <Animated.View
          style={[styles.button, { transform: [{ scale: animatedScale }] }]}>
          <Text style={styles.buttonText}>Scan Me</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ee6055',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading:{
    fontFamily:'monoscope',
    fontSize:28,
    fontWeight:'bold',
    color:'#172a3a',
    marginTop:20
  },
  subheading:{
    fontFamily:'monoscope',
    fontSize:15,
    fontWeight:'bold',
    color:'#172a3a',
    marginTop:10,
    marginLeft:20,
    alignItems:'center'
  },
  boy: {
    flex: 1,
    height: 400,
    width: 700,
    resizeMode: 'contain',
    marginLeft: 20,
    marginBottom: 100,
  },
  button: {
    backgroundColor: '#0b5351',
    width: 200,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -120,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
  },
});
/*const appStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        headerShown: false
      }
    },
    Details: {
      screen: DetailsScreen
    }
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(appStackNavigator);*/
