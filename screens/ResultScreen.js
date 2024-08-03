import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { getNutritionInfo } from '../services/HealthTipsService';

const healthTips = {
  underweight: [
    "Consider increasing your caloric intake with nutrient-dense foods.",
    "Include more protein in your diet to build muscle mass.",
    "Consult a healthcare provider to rule out any underlying conditions."
  ],
  normal: [
    "Maintain a balanced diet with a variety of nutrients.",
    "Stay active with regular exercise to maintain overall health.",
    "Continue to monitor your weight and adjust your diet as needed."
  ],
  overweight: [
    "Incorporate more physical activity into your daily routine.",
    "Monitor your caloric intake and opt for healthier food choices.",
    "Consult a dietitian for personalized dietary advice."
  ],
  obesity: [
    "Seek advice from a healthcare provider for a weight management plan.",
    "Adopt a diet low in processed foods and high in fiber.",
    "Engage in regular physical activity and consider behavioral therapy."
  ]
};

const ResultScreen = ({ route }) => {
  const { bmi } = route.params;
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bmi < 18.5) {
      setCategory('underweight');S
    } else if (bmi < 24.9) {
      setCategory('normal');
    } else if (bmi < 29.9) {
      setCategory('overweight');
    } else {
      setCategory('obesity');
    }
  }, [bmi]);

  const fetchNutritionInfo = async () => {
    try {
      const data = await getNutritionInfo(query);
      setNutritionData(data);
    } catch (err) {
      setError('Failed to fetch nutrition data');
    }
  };

  return (
    <View style={styles.container}>
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

      <Text>Your BMI: {bmi}</Text>
      <Text>Category: {category.charAt(0).toUpperCase() + category.slice(1)}</Text>

      <View style={styles.tipsContainer}>
        <Text style={styles.sectionTitle}>Health Tips:</Text>
        {healthTips[category]?.map((tip, index) => (
          <Text key={index} style={styles.tip}>{tip}</Text>
        ))}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tipsContainer: {
    marginBottom: 20,
  },
  nutritionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tip: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 16,
  },
  error: {
    color: 'red',
  },
});

export default ResultScreen;
