import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Image, Easing, SafeAreaView, ScrollView, View } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(30)).current;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fadeAnim.setValue(0);
      translateYAnim.setValue(30);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isFocused, fadeAnim, translateYAnim]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Animated.Image
            source={require('../assets/BMI.png')}
            style={[
              styles.homeImage,
              {
                opacity: fadeAnim,
                transform: [{ translateY: translateYAnim }],
              }
            ]}
          />
          <Animated.Text style={[
            styles.homeTitleText,
            {
              opacity: fadeAnim,
              transform: [{ translateY: translateYAnim }],
            }
          ]}>
            Integrated Health Analytics
          </Animated.Text>
        </View>

        <View style={[styles.container1, { flexDirection: 'row' }]}>
          <View style={{ flex: 4 }}>
            <Text variant='headlineMedium' style={styles.title} >About:</Text>
            <Text variant='bodyMedium' style={styles.description}>
              Integrated Health Analytics is a mobile application designed to help users monitor their health and wellness. Built with React Native, it offers a user-friendly interface for calculating BMI and obtaining detailed nutritional information on various foods. The app uses advanced features and reliable APIs to provide personalized health tips and meal plans based on the user's BMI category.
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <View style={styles.centeredView}>
              <Image source={require('../assets/person.png')} style={styles.person} />
            </View>
          </View>
        </View>

        <View style={styles.container2}>
          <Text variant='headlineMedium' style={styles.title1} >Developers</Text>
          <ScrollView horizontal>
            <View style={styles.profileCards} elevation={0}>
              <Image source={require('../assets/KMB.jpg')} style={styles.profileImages} />
              <View style={styles.container3}>
                <Text variant='titleMedium'>Kayla Mae Baluyot</Text>
                <Text variant='bodySmall' styles={styles.description1}>BSIT-NS-3A</Text>
              </View>
            </View>
            <View style={styles.profileCards} elevation={0}>
              <Image source={require('../assets/JPSD.jpg')} style={styles.profileImages} />
              <View style={styles.container3}>
                <Text variant='titleMedium'>John Paul Dellova</Text>
                <Text variant='bodySmall' styles={styles.description1}>BSIT-NS-3A</Text>
              </View>
            </View>
            <View style={styles.profileCards} elevation={0}>
              <Image source={require('../assets/JRM.jpg')} style={styles.profileImages} />
              <View style={styles.container3}>
                <Text variant='titleMedium'>John Radilh Mancao</Text>
                <Text variant='bodySmall' styles={styles.description1}>BSIT-NS-3A</Text>
              </View>
            </View>
            <View style={styles.profileCards} elevation={0}>
              <Image source={require('../assets/KJO.jpg')} style={styles.profileImages} />
              <View style={styles.container3}>
                <Text variant='titleMedium'>Karl Jaspher Odevilas</Text>
                <Text variant='bodySmall' styles={styles.description1}>BSIT-NS-3A</Text>
              </View>
            </View>
            <View style={styles.profileCards} elevation={0}>
              <Image source={require('../assets/GP.jpg')} style={styles.profileImages} />
              <View style={styles.container3}>
                <Text variant='titleMedium'>Gerelito Puyos</Text>
                <Text variant='bodySmall' styles={styles.description1}>BSIT-NS-3A</Text>
              </View>
            </View>
            <View style={styles.profileCards} elevation={0}>
              <Image source={require('../assets/MSC.jpg')} style={styles.profileImages} />
              <View style={styles.container3}>
                <Text variant='titleMedium'>Marice Sol Cruz</Text>
                <Text variant='bodySmall' styles={styles.description1}>BSIT-NS-3A</Text>
              </View>
            </View>
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: '25%',
    paddingBottom: '10%'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25
  },
  container1: {
    padding: 20,
    paddingBottom: 0,
    flex: 1
  },
  container2: {
    padding: 20,
  },
  container3: {
    padding: 5,
  },
  homeImage: {
    width: 250,
    height: 150,
  },
  person: {
    width: 78,
    height: 186,
    objectFit: 'contain',
  },
  homeTitleText: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 'bold',
  },
  title1: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  description: {
    textAlign: 'justify',
  },
  description1: {
    color: 'gray',
  },
  profileCards: {
    width: 150,
    marginRight: 10
  },
  profileImages: {
    width: 150,
    height: 150,
    borderRadius: 10
  }
});

export default HomeScreen;
