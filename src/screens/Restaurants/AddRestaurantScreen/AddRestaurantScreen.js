import React from "react";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuid } from "uuid";
import Toast from "react-native-toast-message";
import { doc, setDoc } from "firebase/firestore";
import InfoForm from "../../../components/restaurants/AddRestaurant/InfoForm/InfoForm";
import UploadImageForm from "../../../components/restaurants/AddRestaurant/UploadImageForm/UploadImageForm";
import ImageRestaurant from "../../../components/restaurants/AddRestaurant/ImageRestaurant/ImageRestaurant";
import { db } from "../../../utils/firebase";
import { styles } from "./AddRestaurantScreenStyles";
import { screen } from "../../../utils/screenName";

export default function AddRestaurantScreen() {
  const navigation = useNavigation();

  const validationSchema = () => {
    return Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      address: Yup.string().required("La dirección es obligatoria"),
      phone: Yup.string().required("El telefono es obligatorio"),
      email: Yup.string()
        .email("No es un email valido")
        .required("El email es obligatorio"),
      description: Yup.string().required("La descripción es obligatoria"),
      location: Yup.object().required("La Localización es obligatoria"),
      images: Yup.array()
        .min(1, "Se require una imagen como minimo")
        .required("La imagen del restaurante es obligatoria"),
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      description: "",
      location: null,
      images: [],
    },
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData = formValue;
        newData.id = uuid();
        newData.createdAt = new Date();
        const ref = doc(db, "restaurants", newData.id);
        await setDoc(ref, newData);
        navigation.navigate(screen.restaurant.restaurants);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al crear el restaurante, intentelo más tarde",
        });
        console.log(error);
      }
    },
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurant formik={formik} />
      <InfoForm formik={formik} />
      <UploadImageForm formik={formik} />
      <Button
        title="Crear Restaurante"
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  );
}
