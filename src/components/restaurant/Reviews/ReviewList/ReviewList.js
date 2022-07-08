import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Text, AirbnbRating, ListItem, Avatar } from "react-native-elements";
import {
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import LoadingModal from "../../../shared/LoadingModal/LoadingModal";
import { map } from "lodash";
import { DateTime } from "luxon";
import "intl";
import "intl/locale-data/jsonp/es";
import { styles } from "./ReviewListStyles";
import { db } from "../../../../utils/firebase";

export default function ReviewList(props) {
  const { id } = props;
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", id),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setReviews(snapshot.docs);
    });
  }, []);

  if (!reviews) return <LoadingModal show text="Cargando Reseñas" />;

  return (
    <View style={styles.content}>
      {map(reviews, (review, i) => {
        const data = review.data();
        const createdAtDate = new Date(data.createdAt.seconds * 1000);
        return (
          <ListItem key={i} bottomDivider containerStyle={styles.review}>
            <Avatar source={{ uri: data.avatar }} size={50} rounded />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{data.title}</ListItem.Title>
              <View style={styles.subtitle}>
                <Text style={styles.comment}>{data.comment}</Text>
                <View style={styles.contentRating}>
                  <AirbnbRating
                    defaultRating={data.rating}
                    showRating={false}
                    size={15}
                    isDisabled
                    starContainerStyle={styles.stars}
                  />
                  <Text style={styles.date}>
                    {DateTime.fromISO(createdAtDate.toISOString()).toFormat(
                      "yyyy/MM/dd - hh:mm"
                    )}
                  </Text>
                </View>
              </View>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </View>
  );
}
