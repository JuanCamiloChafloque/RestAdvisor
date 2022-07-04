import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RestaurantsScreen from "../screens/Restaurants/RestaurantsScreen";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurantScreen";

import { screen } from "../utils/screenName";

const Stack = createNativeStackNavigator();

export default function RestaurantStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        name={screen.restaurant.restaurants}
        component={RestaurantsScreen}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name={screen.restaurant.addRestaurant}
        component={AddRestaurantScreen}
        options={{ title: "Nuevo Restaurante" }}
      />
    </Stack.Navigator>
  );
}
