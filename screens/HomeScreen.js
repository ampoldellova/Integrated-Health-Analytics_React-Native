// import React, { useState } from 'react';
// import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

// const HomeScreen = ({ navigation }) => {
//   const [weight, setWeight] = useState('');
//   const [height, setHeight] = useState('');

//   const calculateBMI = () => {
//     const heightInMeters = height / 100;
//     const bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
//     navigation.navigate('Result', { bmi });
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Enter your weight (kg):</Text>
//       <TextInput 
//         style={styles.input} 
//         keyboardType="numeric" 
//         value={weight} 
//         onChangeText={setWeight} 
//       />
//       <Text>Enter your height (cm):</Text>
//       <TextInput 
//         style={styles.input} 
//         keyboardType="numeric" 
//         value={height} 
//         onChangeText={setHeight} 
//       />
//       <Button title="Calculate BMI" onPress={calculateBMI} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: 'gray',
//     borderWidth: 1,
//     marginBottom: 12,
//     paddingHorizontal: 8,
//   },
// });

// export default HomeScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image } from 'react-native';
import getHealthTips from '../services/HealthTipsService';
import { getNutritionInfo } from '../services/NutritionixService';

const App = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');
  const [tips, setTips] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [query, setQuery] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState(null);

  const calculateBMI = async () => {
    const heightInMeters = parseFloat(height) / 100;
    const bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));
    categorizeBMI(bmiValue);
  };

  const categorizeBMI = async (bmi) => {
    let category = '';
    if (bmi < 18.5) {
      category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      category = 'Overweight';
    } else {
      category = 'Obesity';
    }
    setCategory(category);

    const { tips, mealPlan } = await getHealthTips(category);
    setTips(tips);
    setMealPlan(mealPlan);
  };

  const fetchNutritionInfo = async () => {
    try {
      const data = await getNutritionInfo(query);
      setNutritionData(data);
    } catch (err) {
      setError('Failed to fetch nutrition data');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>BMI Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <Button title="Calculate" onPress={calculateBMI} />

      <View style={styles.nutritionContainer}>
        <Text style={styles.sectionTitle}>Nutrition Info:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter food item"
          value={query}
          onChangeText={setQuery}
        />
        <Button title="Get Nutrition Info" onPress={fetchNutritionInfo} />
        {error && <Text style={styles.error}>{error}</Text>}
        {nutritionData && (
          <View style={styles.result}>
            <Text>Food: {nutritionData.foods[0]?.food_name}</Text>
            <Text>Calories: {nutritionData.foods[0]?.nf_calories} kcal</Text>
            <Text>Protein: {nutritionData.foods[0]?.nf_protein} g</Text>
            <Text>Fat: {nutritionData.foods[0]?.nf_total_fat} g</Text>
            <Text>Carbs: {nutritionData.foods[0]?.nf_total_carbohydrate} g</Text>
          </View>
        )}
      </View>

      {bmi && (
        <View style={styles.result}>
          <Text>Your BMI: {bmi}</Text>
          <Text>Category: {category}</Text>
          <Text style={styles.tips}>{tips}</Text>
          {mealPlan && (
            <View>
              <Text style={styles.mealHeader}>Suggested Meal Plan:</Text>
              {mealPlan.meals.map((meal) => (
                <View key={meal.id} style={styles.mealItem}>
                  <Text>{meal.title}</Text>
                  <Image source={{ uri: `https://spoonacular.com/recipeImages/${meal.id}-312x231.jpg` }} style={styles.mealImage} />
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
  },
  result: {
    marginTop: 20,
    alignItems: 'center',
  },
  tips: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  mealHeader: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mealItem: {
    marginVertical: 10,
    alignItems: 'center',
  },
  mealImage: {
    width: 312,
    height: 231,
  },
  nutritionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 16,
  },
  error: {
    color: 'red',
  },
});

export default App;
