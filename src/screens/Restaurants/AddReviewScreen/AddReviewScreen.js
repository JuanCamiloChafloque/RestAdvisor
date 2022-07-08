import React from "react";
import { View } from "react-native";
import { AirbnbRating, Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { styles } from "./AddReviewScreenStyles";

export default function AddReviewScreen(props) {
  const { route } = props;

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
