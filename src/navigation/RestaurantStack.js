import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RestaurantsScreen from "../screens/Restaurants/RestaurantScreen/RestaurantsScreen";
import AddRestaurantScreen from "../screens/Restaurants/AddRestaurantScreen/AddRestaurantScreen";
import RestaurantDetailsScreen from "../screens/Restaurants/DetailsScreen/RestaurantDetailsScreen";
import AddReviewScreen from "../screens/Restaurants/AddReviewScreen/AddReviewScreen";

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
      <Stack.Screen
        name={screen.restaurant.details}
        component={RestaurantDetailsScreen}
        options={{ title: "Detalles del Restaurante" }}
      />
      <Stack.Screen
        name={screen.restaurant.addReview}
        component={AddReviewScreen}
        options={{ title: "Nueva Opinión" }}
      />
    </Stack.Navigator>
  );
}
