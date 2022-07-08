import React from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AirbnbRating, Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { v4 as uuid } from "uuid";
import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { map, mean } from "lodash";
import { styles } from "./AddReviewScreenStyles";

export default function AddReviewScreen(props) {
  const { route } = props;
  const navigation = useNavigation();

  const validationSchema = () => {
    return Yup.object({
      title: Yup.string().required("El titulo es obligatorio"),
      comment: Yup.string().required("El comentario es obligatorio"),
      rating: Yup.number().required("El rating es obligatorio"),
    });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      comment: "",
      rating: 3,
    },
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        const idDoc = uuid();
        const newData = formValue;
        newData.id = idDoc;
        newData.idRestaurant = route.params.id;
        newData.idUser = auth.currentUser.uid;
        newData.avatar = auth.currentUser.photoURL;
        newData.createdAt = new Date();

        await setDoc(doc(db, "reviews", idDoc), newData);
        await updateRestaurant();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al enviar el comentario, intentelo más tarde",
        });
        console.log(error);
      }
    },
  });

  const updateRestaurant = async () => {
    const q = query(
      collection(db, "reviews"),
      where("idRestaurant", "==", route.params.id)
    );

    onSnapshot(q, async (snapshot) => {
      const reviews = snapshot.docs;
      const arrayStars = map(reviews, (review) => review.data().rating);
      const media = mean(arrayStars);
      const restaurantRef = doc(db, "restaurants", route.params.id);
      await updateDoc(restaurantRef, {
        rating: media,
      });
      navigation.goBack();
    });
  };

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.rating}>
          <AirbnbRating
            count={5}
            reviews={[
              "Pesimo",
              "Deficiente",
              "Normal",
              "Muy Bueno",
              "Excelente",
            ]}
            defaultRating={formik.values.rating}
            size={35}
            onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
          />
        </View>
        <View>
          <Input
            placeholder="Titulo"
            onChangeText={(text) => formik.setFieldValue("title", text)}
            errorMessage={formik.errors.title}
          />
          <Input
            placeholder="Comentario"
            multiline
            inputContainerStyle={styles.comment}
            onChangeText={(text) => formik.setFieldValue("comment", text)}
            errorMessage={formik.errors.comment}
          />
        </View>
      </View>
      <Button
        title="Enviar Comentario"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
