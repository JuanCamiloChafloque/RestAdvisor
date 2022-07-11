import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import LoadingModal from "../../../components/shared/LoadingModal/LoadingModal";
import Carousel from "../../../components/shared/Carousel/Carousel";
import Header from "../../../components/restaurant/Header/Header";
import Information from "../../../components/restaurant/Information/Information";
import ReviewList from "../../../components/restaurant/Reviews/ReviewList/ReviewList";
import ReviewForm from "../../../components/restaurant/Reviews/ReviewForm/ReviewForm";
import Favorite from "../../../components/restaurant/Favorite/Favorite";
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
    <ScrollView style={styles.content}>
      <Carousel images={restaurant.images} width={width} height={250} />
      <Header restaurant={restaurant} />
      <Information restaurant={restaurant} />
      <ReviewForm id={restaurant.id} />
      <ReviewList id={restaurant.id} />
      <Favorite id={restaurant.id} />
    </ScrollView>
  );
}
