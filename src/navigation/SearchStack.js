import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SearchScreen from "../screens/Search/SearchScreen";

import { screen } from "../utils/screenName";

const Stack = createNativeStackNavigator();

export default function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        name={screen.search.search}
        component={SearchScreen}
        options={{ title: "Buscador" }}
      />
    </Stack.Navigator>
  );
}
