import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RankingScreen from "../screens/Rankings/RankingScreen";

import { screen } from "../utils/screenName";

const Stack = createNativeStackNavigator();

export default function RankingStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        name={screen.ranking.rankings}
        component={RankingScreen}
        options={{ title: "Rankings" }}
      />
    </Stack.Navigator>
  );
}
