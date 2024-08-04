import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { getNutritionInfo } from '../services/NutritionixService';

const NutritionInfoScreen = () => {
  const [query, setQuery] = useState('');
  const [nutritionData, setNutritionData] = useState(null);
  const [error, setError] = useState(null);

  const fetchNutritionInfo = async () => {
    try {
      const data = await getNutritionInfo(query);
      setNutritionData(data);
      setError('');
    } catch (err) {
      setError('Error fetching nutrition data');
      setNutritionData(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant='headlineMedium' style={styles.header}>Nutrition Info</Text>
      <View style={styles.nutritionContainer}>
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
            {nutritionData.foods[0]?.photo?.thumb && (
              <Image
                source={{ uri: nutritionData.foods[0].photo.thumb }}
                style={styles.foodImage}
              />
            )}
            <Text variant='bodyLarge'>Food: {nutritionData.foods[0]?.food_name}</Text>
            <Text variant='bodyLarge'>Calories: {nutritionData.foods[0]?.nf_calories}kcal</Text>
            <Text variant='bodyLarge'>Protein: {nutritionData.foods[0]?.nf_protein}g</Text>
            <Text variant='bodyLarge'>Carbs: {nutritionData.foods[0]?.nf_total_carbohydrate}g</Text>
            <Text variant='bodyLarge'>Fat: {nutritionData.foods[0]?.nf_total_fat}g</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: '25%'
  },
  nutritionContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 16,
  },
  error: {
    color: 'red',
  },
  foodImage: {
    width: 'auto',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc'
  },
});

export default NutritionInfoScreen;
