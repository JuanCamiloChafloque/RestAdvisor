import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native-elements";
import { styles } from "./ImageRestaurantStyles";

export default function ImageRestaurant(props) {
  const { formik } = props;

  const principalImage = formik.values.images[0];

  return (
    <View style={styles.content}>
      <Image
        source={
          principalImage
            ? { uri: principalImage }
            : require("../../../../../assets/img/restaurante.png")
        }
        style={styles.image}
      />
    </View>
  );
}
