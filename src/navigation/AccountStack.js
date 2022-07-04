import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AccountScreen from "../screens/Account/AccountScreen";
import LoginScreen from "../screens/Account/LoginScreen";

import { screen } from "../utils/screenName";

const Stack = createNativeStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTitleAlign: "center",
      })}
    >
      <Stack.Screen
        name={screen.account.account}
        component={AccountScreen}
        options={{ title: "Cuenta" }}
      />
      <Stack.Screen
        name={screen.account.login}
        component={LoginScreen}
        options={{ title: "Inciar Sesión" }}
      />
    </Stack.Navigator>
  );
}
