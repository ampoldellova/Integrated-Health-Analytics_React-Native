import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, ScrollView, Image, SafeAreaView } from 'react-native';
import { Text } from 'react-native-paper';
import getHealthTips from '../services/HealthTipsService';

const BMICalculatorScreen = ({ navigation }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [tips, setTips] = useState('');
  const [bodyImage, setBodyImage] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);

  const calculateBMI = async () => {
    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    categorizeBMI(bmiValue);
  };

  const categorizeBMI = async (bmi) => {
    let category = '';
    let imageSource;
    if (bmi < 18.5) {
      category = 'Underweight';
      imageSource = require('../assets/underweight.png');
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal weight';
      imageSource = require('../assets/normal.png');
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
      imageSource = require('../assets/overweight.png');
    } else {
      category = 'Obesity';
      imageSource = require('../assets/obesity.png');
    }
    setCategory(category);
    setBodyImage(imageSource);

    const { tips, mealPlan } = await getHealthTips(category);
    setTips(tips);
    setMealPlan(mealPlan);
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>BMI Calculator</Text>
        <View style={{ flexDirection: 'row' }}>
          <TextInput
            style={[styles.input, { flex: 3, marginRight: 10 }]}
            placeholder="Weight in (kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <TextInput
            style={[styles.input, { flex: 3 }]}
            placeholder="Height in (cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
        </View>
        <Button title="Calculate" onPress={calculateBMI} />

        {bmi && (
          <View style={styles.result}>
            <View style={[styles.container1, { flexDirection: 'row' }]}>
              {bodyImage && <Image source={bodyImage} style={[styles.person, { flex: 2 }]} />}
              <View style={[styles.container2, { flex: 4 }]}>
                <Text variant='bodyLarge' style={styles.texts}>Weight Category: {category}</Text>
                <Text variant='bodyLarge' style={styles.texts}>Your BMI: {bmi}</Text>
                <Text variant='bodyMedium' style={styles.tips}>Tips: {tips}</Text>
              </View>
            </View>
            <Text variant='headlineMedium' style={styles.mealHeader}>Suggested Meal Plan:</Text>
            {mealPlan && (
              <ScrollView horizontal>
                {mealPlan.meals.map((meal) => (
                  <View key={meal.id} style={styles.mealItem}>
                    <Image style={styles.mealImage} source={{ uri: `https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg` }} />
                    <Text variant='titleMedium' style={styles.mealItemTitle}>{meal.title}</Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container1: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10
  },
  container2: {
    paddingVertical: '15%'
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingTop: '25%'
  },
  texts: {
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  result: {
    paddingVertical: 20,
  },
  tips: {
    textAlign: 'left',
    marginVertical: 3,
    fontStyle: 'italic',
    color: 'gray',
    paddingRight: 5
  },
  person: {
    width: 78,
    height: 186,
    objectFit: 'contain',
  },
  mealHeader: {
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center'
  },
  mealItem: {
    marginRight: 10,
    width: 150
  },
  mealItemTitle: {
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 5
  },
  mealImage: {
    width: 150,
    height: 150,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default BMICalculatorScreen;
