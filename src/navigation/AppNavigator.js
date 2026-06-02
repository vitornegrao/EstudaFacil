import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

// Importação das telas (certifique-se de criá-las na pasta src/screens)
import HomeScreen from "../screens/HomeScreen";
import QuizSetupScreen from "../screens/QuizSetupScreen";
import QuizPlayScreen from "../screens/QuizPlayScreen";
import QuizResultScreen from "../screens/QuizResultScreen";
import MateriasScreen from "../screens/MateriasScreen";
import PerfilScreen from "../screens/PerfilScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack exclusivo para o fluxo do Quiz
function QuizStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuizSetup" component={QuizSetupScreen} />
      <Stack.Screen name="QuizPlay" component={QuizPlayScreen} />
      <Stack.Screen name="QuizResult" component={QuizResultScreen} />
    </Stack.Navigator>
  );
}

// Tab Navigator principal
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        headerTintColor: COLORS.surface,
        headerStyle: { backgroundColor: COLORS.primary },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Início")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "Quiz")
            iconName = focused ? "game-controller" : "game-controller-outline";
          else if (route.name === "Matérias")
            iconName = focused ? "book" : "book-outline";
          else if (route.name === "Perfil")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen
        name="Quiz"
        component={QuizStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Matérias" component={MateriasScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
