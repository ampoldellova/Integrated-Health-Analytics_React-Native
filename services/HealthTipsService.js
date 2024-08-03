import axios from 'axios';

const SPOONACULAR_API_KEY = 'b5cd1d143f8c481894e00e13980de52b';

const getHealthTips = async (category) => {
  let tips = '';

  switch (category) {
    case 'Underweight':
      tips = 'Eat more frequently, choose nutrient-rich foods, and try smoothies and shakes.';
      break;
    case 'Normal weight':
      tips = 'Maintain a balanced diet and regular physical activity to stay healthy.';
      break;
    case 'Overweight':
      tips = 'Increase physical activity and focus on a balanced, calorie-controlled diet.';
      break;
    case 'Obesity':
      tips = 'Consult a healthcare provider for a personalized plan. Focus on a balanced diet and regular exercise.';
      break;
    default:
      tips = 'Maintain a healthy lifestyle with a balanced diet and regular physical activity.';
      break;
  }

  const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=2000&diet=vegetarian&apiKey=${SPOONACULAR_API_KEY}`);
  const mealPlan = response.data;

  return {
    tips,
    mealPlan
  };
};

export default getHealthTips;


