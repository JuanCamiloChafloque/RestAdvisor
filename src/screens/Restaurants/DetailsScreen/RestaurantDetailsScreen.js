import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import LoadingModal from "../../../components/shared/LoadingModal/LoadingModal";
import Carousel from "../../../components/shared/Carousel/Carousel";
import { styles } from "./RestaurantDetailsScreenStyles";

const { width } = Dimensions.get("window");

export default function RestaurantDetailsScreen(props) {
  const { route } = props;
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    setRestaurant(null);
    onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
      setRestaurant(doc.data());
    });
  }, [route.params.id]);

  if (!restaurant) return <LoadingModal show text="Cargando Restaurante" />;

  return (
    <ScrollView styles={styles.content}>
      <Carousel images={restaurant.images} width={width} height={250} />
    </ScrollView>
  );
}
