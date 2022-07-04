import React from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Image } from "react-native-elements";
import { styles } from "./LoginScreenStyles";
import { screen } from "../../../utils/screenName";

export default function LoginScreen() {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate(screen.account.register);
  };

  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/logo2.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text>LoginScreen</Text>
        <Text onPress={goToRegister}>Registrarse</Text>
      </View>
    </ScrollView>
  );
}
