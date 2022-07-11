import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { size } from "lodash";
import LoadingModal from "../../components/shared/LoadingModal/LoadingModal";
import UserNotLogged from "../../components/favorites/UserNotLogged/UserNotLogged";
import NotFound from "../../components/favorites/NotFound/NotFound";
import { db } from "../../utils/firebase";

export default function FavoritesScreen() {
  const auth = getAuth();
  const [restaurants, setRestaurants] = useState(null);
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "favorites"),
      where("idUser", "==", auth.currentUser.uid)
    );
    onSnapshot(q, async (snapshot) => {
      let restaurants = [];
      for await (const item of snapshot.docs) {
        const data = item.data();
        const docRef = doc(db, "restaurants", data.idRestaurant);
        const docSnap = await getDoc(docRef);
        const newData = docSnap.data();
        newData.idFavorite = data.id;
        restaurants.push(newData);
      }
      setRestaurants(restaurants);
    });
  }, []);

  if (!hasLogged) return <UserNotLogged />;
  if (!restaurants) return <LoadingModal show text="Cargando Favoritos" />;
  if (size(restaurants) === 0) return <NotFound />;

  return (
    <View>
      <Text>FavoritesScreen</Text>
    </View>
  );
}
