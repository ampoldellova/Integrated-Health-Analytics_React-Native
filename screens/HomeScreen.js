import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const calculateBMI = () => {
    const heightInMeters = height / 100;
    const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    navigation.navigate('Result', { bmi });
  };

  return (
    <View style={styles.container}>
      <Text>Enter your weight (kg):</Text>
      <TextInput 
        style={styles.input} 
        keyboardType="numeric" 
        value={weight} 
        onChangeText={setWeight} 
      />
      <Text>Enter your height (cm):</Text>
      <TextInput 
        style={styles.input} 
        keyboardType="numeric" 
        value={height} 
        onChangeText={setHeight} 
      />
      <Button title="Calculate BMI" onPress={calculateBMI} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default HomeScreen;
