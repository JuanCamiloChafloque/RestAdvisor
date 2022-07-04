import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Button, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./UserGuestScreenStyles";
import { screen } from "../../../utils/screenName";

export default function UserGuestScreen() {
  const navigation = useNavigation();

  const goToLogin = () => {
    navigation.navigate(screen.account.login);
  };

  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image
        source={require("../../../../assets/img/logo2.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Consultar tu perfil de RestAdvisor</Text>
      <Text style={styles.description}>
        ¿Como describirías tu mejor restaurante? Busca y visualiza los mejores
        restaurantes de una forma sencilla, vota cual te ha gustado más y
        comenta cual ha sido tu experiencia.
      </Text>
      <View>
        <Button
          title="Ver tu perfil"
          onPress={goToLogin}
          buttonStyle={styles.btnPerfil}
        />
      </View>
    </ScrollView>
  );
}
