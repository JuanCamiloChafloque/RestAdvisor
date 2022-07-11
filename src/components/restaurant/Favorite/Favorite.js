import React from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  query,
  where,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../../../utils/firebase";
import { styles } from "./FavoriteStyles";

export default function Favorite(props) {
  const { id } = props;
  const auth = getAuth();

  const addFavorite = async () => {
    try {
      const idFavorite = uuid();
      const data = {
        id: idFavorite,
        idRestaurant: id,
        idUser: auth.currentUser.uid,
      };
      await setDoc(doc(db, "favorites", idFavorite), data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.content}>
      <Icon
        type="material-community"
        name="heart-outline"
        color={"#000"}
        size={35}
        onPress={addFavorite}
      />
    </View>
  );
}
