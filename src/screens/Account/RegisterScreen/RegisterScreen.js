import React from "react";
import { View, ScrollView } from "react-native";
import { Image } from "react-native-elements";
//import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import RegisterForm from "../../../components/auth/RegisterForm/RegisterForm";
import { styles } from "./RegisterScreenStyles";
import { screen } from "../../../utils/screenName";

export default function RegisterScreen() {
  return (
    <ScrollView>
      <Image
        source={require("../../../../assets/img/logo2.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <RegisterForm />
      </View>
    </ScrollView>
  );
}
