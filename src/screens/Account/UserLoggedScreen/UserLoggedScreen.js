import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { getAuth, signOut } from "firebase/auth";
import LoadingModal from "../../../components/shared/LoadingModal/LoadingModal";
import InfoUser from "../../../components/account/InfoUser/InfoUser";
import AccountOptions from "../../../components/account/AccountOptions";
import { styles } from "./UserLoggedScreenStyles";

export default function UserLoggedScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const logout = async () => {
    const auth = getAuth();
    await signOut(auth);
  };

  return (
    <View>
      <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
      <AccountOptions />
      <Button
        title="Cerrar Sesión"
        buttonStyle={styles.btnStyles}
        titleStyle={styles.btnText}
        onPress={logout}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  );
}
