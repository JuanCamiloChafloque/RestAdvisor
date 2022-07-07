import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import InfoForm from "../../../components/restaurants/AddRestaurant/InfoForm/InfoForm";
import { styles } from "./AddRestaurantScreenStyles";

export default function AddRestaurantScreen() {
  const validationSchema = () => {
    return Yup.object({
      name: Yup.string().required("El nombre es obligatorio"),
      address: Yup.string().required("La dirección es obligatoria"),
      phone: Yup.string().required("El telefono es obligatorio"),
      email: Yup.string()
        .email("No es un email valido")
        .required("El email es obligatorio"),
      description: Yup.string().required("La descripción es obligatoria"),
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      description: "",
    },
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
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
    <View>
      <InfoForm formik={formik} />
      <Button
        title="Crear Restaurante"
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
