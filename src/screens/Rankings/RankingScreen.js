import React, { useState, useEffect } from "react";
import { ScrollView, Text } from "react-native";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { size, map } from "lodash";
import LoadingModal from "../../components/shared/LoadingModal/LoadingModal";
import ListRanking from "../../components/restaurants/ListRanking/ListRanking";
import { db } from "../../utils/firebase";

export default function RankingScreen() {
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("rating", "desc"),
      limit(10)
    );
    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs);
    });
  }, []);

  if (!restaurants) return <LoadingModal show text="Cargando rankings" />;

  return (
    <ScrollView>
      {map(restaurants, (rest, i) => (
        <ListRanking key={i} index={i} restaurant={rest.data()} />
      ))}
    </ScrollView>
  );
}
