import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "react-native-elements";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { size } from "lodash";
import { styles } from "./ReviewFormStyles";
import { db } from "../../../../utils/firebase";
import { screen } from "../../../../utils/screenName";

export default function ReviewForm(props) {
  const { id } = props;
  const auth = getAuth();
  const navigation = useNavigation();

  const [hasLogged, setHasLogged] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    if (hasLogged) {
      const q = query(
        collection(db, "reviews"),
        where("idRestaurant", "==", id),
        where("idUser", "==", auth.currentUser.uid)
      );
      onSnapshot(q, (snapshot) => {
        if (size(snapshot.docs) > 0) {
          setHasReviewed(true);
        }
      });
    }
  }, [hasLogged]);

  const goToLogin = () => {
    navigation.navigate(screen.account.tab, { screen: screen.account.login });
  };

  const goToAddReview = () => {
    navigation.navigate(screen.restaurant.addReview, { id });
  };

  if (hasLogged && hasReviewed) {
    return (
      <View style={styles.content}>
        <Text style={styles.hasReview}>
          Ya has enviado una reseña sobre este restaurante
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button
          title="Escribe tu opinión"
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#00a680",
          }}
          buttonStyle={styles.btn}
          titleStyle={styles.btnTitle}
          onPress={goToAddReview}
        />
      ) : (
        <Text style={styles.text}>
          Para escribir una opinión es necesario haber iniciado sesión.{" "}
          <Text style={styles.textClick} onPress={goToLogin}>
            Pulsa AQUÍ para iniciar sesión
          </Text>
        </Text>
      )}
    </View>
  );
}
