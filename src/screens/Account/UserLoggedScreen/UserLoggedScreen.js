import { View, Text } from "react-native";
import React from "react";
import InfoUser from "../../../components/account/InfoUser/InfoUser";
import { styles } from "./UserLoggedScreenStyles";

export default function UserLoggedScreen() {
  return (
    <View>
      <InfoUser style={styles.content} />
    </View>
  );
}
