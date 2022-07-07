import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Image } from "react-native-elements";
import { styles } from "./ListRestaurantStyles";
import { screen } from "../../../utils/screenName";

export default function ListRestaurant(props) {
  const { restaurants } = props;
  const navigation = useNavigation();

  const goToRestaurant = (restaurant) => {
    navigation.navigate(screen.restaurant.details, { id: restaurant.id });
  };

  return (
    <View>
      <FlatList
        data={restaurants}
        renderItem={(doc) => {
          const restaurant = doc.item.data();
          return (
            <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
              <View style={styles.content}>
                <Image
                  source={{ uri: restaurant.images[0] }}
                  style={styles.image}
                />
                <View>
                  <Text style={styles.name}>{restaurant.name}</Text>
                  <Text style={styles.info}>{restaurant.address}</Text>
                  <Text style={styles.info}>{restaurant.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
