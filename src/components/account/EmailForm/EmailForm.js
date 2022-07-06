import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {
  getAuth,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { styles } from "./EmailFormStyles";

export default function EmailForm(props) {
  const { onClose, onReload } = props;

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El correo electrónico es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { email, password } = formValue;
        const user = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(user.email, password);
        reauthenticateWithCredential(user, credentials);
        await updateEmail(user, email);
        onReload();
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error actualizando correo electronico. Intente más tarde",
        });
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Nuevo Email"
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Digite Contraseña"
        secureTextEntry={true}
        rightIcon={{
          type: "material-community",
          name: "eye-off-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Cambiar Correo Electrónico"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
