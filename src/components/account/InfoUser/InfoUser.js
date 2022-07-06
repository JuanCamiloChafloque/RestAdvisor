import React from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { getAuth } from "firebase/auth";
import { styles } from "./InfoUserStyles";

export default function InfoUser() {
  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  const changeAvatar = () => {};

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        icon={{ type: "material", name: "person" }}
        source={{ uri: photoURL }}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anonimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
