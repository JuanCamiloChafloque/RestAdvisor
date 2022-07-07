import React from "react";
import { View, Text } from "react-native";
import { styles } from "./RestaurantDetailsScreenStyles";

export default function RestaurantDetailsScreen(props) {
  const { route } = props;
  console.log(route.params);
  return (
    <View>
      <Text>RestaurantDetailsScreen</Text>
    </View>
  );
}
