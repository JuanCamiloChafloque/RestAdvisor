import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import InfoUser from "../../../components/account/InfoUser/InfoUser";
import { styles } from "./UserLoggedScreenStyles";

export default function UserLoggedScreen() {
  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View>
      <InfoUser style={styles.content} />
      <Button
        title="Cerrar Sesión"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnText}
        onPress={logout}
      />
    </View>
  );
}
