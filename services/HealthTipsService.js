import axios from 'axios';

const API_KEY = '2cdb2d7cbf8c1371d7b17b96f5e6335c';
const API_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';

const nutritionixClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-app-id': '3cd8ff54',
    'x-app-key': API_KEY,
  },
});

export const getNutritionInfo = async (query) => {
  try {
    const response = await nutritionixClient.post('', {
      query: query,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching nutrition data', error);
    throw error;
  }
};
