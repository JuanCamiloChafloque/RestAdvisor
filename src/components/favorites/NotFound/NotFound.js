import React from "react";
import { View } from "react-native";
import { Text, Icon } from "react-native-elements";
import { styles } from "./NotFoundStyles";

export default function NotFound() {
  return (
    <View style={styles.content}>
      <Icon type="material-community" name="alert-outline" size={80} />
      <Text style={styles.info}>No tienes restaurantes en tu lista</Text>
    </View>
  );
}
