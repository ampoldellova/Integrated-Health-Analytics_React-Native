import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
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
      <Text style={styles.header}>Nutrition Info</Text>
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
            <Text>Food: {nutritionData.foods[0]?.food_name}</Text>
            <Text>Calories: {nutritionData.foods[0]?.nf_calories} kcal</Text>
            <Text>Protein: {nutritionData.foods[0]?.nf_protein} g</Text>
            <Text>Fat: {nutritionData.foods[0]?.nf_total_fat} g</Text>
            <Text>Carbs: {nutritionData.foods[0]?.nf_total_carbohydrate} g</Text>
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
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  nutritionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
    width: 312,
    height: 231,
    marginTop: 10,
    objectFit:'contain'
  },
});

export default NutritionInfoScreen;
