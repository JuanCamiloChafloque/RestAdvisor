import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image, Icon, Text } from "react-native-elements";
import { doc, deleteDoc } from "firebase/firestore";
import { styles } from "./FavoritesListStyles";
import { db } from "../../../utils/firebase";
import { screen } from "../../../utils/screenName";

export default function FavoritesList(props) {
  const { restaurant } = props;
  const navigation = useNavigation();

  const goToRestaurant = () => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.details,
      params: {
        id: restaurant.id,
      },
    });
  };

  const onRemoveFavorite = async () => {
    try {
      await deleteDoc(doc(db, "favorites", restaurant.idFavorite));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.content}>
        <Image source={{ uri: restaurant.images[0] }} style={styles.image} />
        <View style={styles.infoContent}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Icon
            type="material-community"
            name="heart"
            color="#f00"
            size={35}
            containerStyle={styles.iconContainer}
            onPress={onRemoveFavorite}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
