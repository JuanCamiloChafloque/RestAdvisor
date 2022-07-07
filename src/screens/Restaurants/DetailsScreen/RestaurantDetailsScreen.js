import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { styles } from "./RestaurantDetailsScreenStyles";

export default function RestaurantDetailsScreen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);

  console.log(route.params);
  return (
    <View>
      <Text>RestaurantDetailsScreen</Text>
    </View>
  );
}
