import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import { getAuth, updateProfile } from "firebase/auth";
import { styles } from "./DisplayNameFormStyles";

export default function DisplayNameForm(props) {
  const { onClose, onReload } = props;

  const validationSchema = () => {
    return Yup.object({
      displayName: Yup.string().required(
        "Nombres y apellidos son obligatorios"
      ),
    });
  };

  const formik = useFormik({
    initialValues: {
      displayName: "",
    },
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { displayName } = formValue;
        const user = getAuth().currentUser;
        await updateProfile(user, { displayName: displayName });
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error actualizando nombres y apellidos. Intente más tarde",
        });
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombres y apellidos"
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />
      <Button
        title="Cambiar Nombres y Apellidos"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
