import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import BMICalculatorScreen from './BMICalculatorScreen';
import NutritionInfoScreen from './NutritionInfoScreen';
import { Ionicons } from '@expo/vector-icons'; // or any other icon library you use

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'BMICalculator') {
                            iconName = 'calculator';
                        } else if (route.name === 'NutritionInfo') {
                            iconName = 'nutrition';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#803D3B',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
                <Tab.Screen name="BMICalculator" component={BMICalculatorScreen} options={{ title: 'BMI Calculator', headerShown: false }} />
                <Tab.Screen name="NutritionInfo" component={NutritionInfoScreen} options={{ title: 'Nutrition Information', headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;
