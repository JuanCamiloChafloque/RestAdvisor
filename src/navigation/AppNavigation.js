import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "react-native-elements";
import RestaurantsScreen from "../screens/RestaurantsScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import RankingScreen from "../screens/RankingScreen";
import SearchScreen from "../screens/SearchScreen";
import AccountScreen from "../screens/AccountScreen";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => tabBarIconOptions(route, color, size),
      })}
    >
      <Tab.Screen name="Restaurant" component={RestaurantsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Ranking" component={RankingScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

function tabBarIconOptions(route, color, size) {
  let iconName;

  if (route.name === "Restaurant") {
    iconName = "compass-outline";
  }

  if (route.name === "Favorites") {
    iconName = "heart-outline";
  }

  if (route.name === "Ranking") {
    iconName = "star-outline";
  }

  if (route.name === "Search") {
    iconName = "magnify";
  }

  if (route.name === "Account") {
    iconName = "home-outline";
  }

  return (
    <Icon
      type="material-community"
      name={iconName}
      color={color}
      size={size}
    ></Icon>
  );
}
