import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FavoritesScreen from "../screens/Favorites/FavoritesScreen";

import { screen } from "../utils/screenName";

const Stack = createNativeStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        name={screen.favorites.favorites}
        component={FavoritesScreen}
        options={{ title: "Favoritos" }}
      />
    </Stack.Navigator>
  );
}
