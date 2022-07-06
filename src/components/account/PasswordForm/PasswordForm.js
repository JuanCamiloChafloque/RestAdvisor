import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import Toast from "react-native-toast-message";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { styles } from "./PasswordFormStyles";

export default function PasswordForm(props) {
  const { onClose } = props;

  const validationSchema = () => {
    return Yup.object({
      password: Yup.string().required("La contraseña actual es obligatoria"),
      newPassword: Yup.string().required("La nueva contraseña es obligatoria"),
      confirmNewPassword: Yup.string()
        .required("La nueva contraseña es obligatoria")
        .oneOf(
          [Yup.ref("newPassword")],
          "Las nuevas contraseñas tienen que ser iguales"
        ),
    });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const { password, newPassword } = formValue;
        const user = getAuth().currentUser;
        const credentials = EmailAuthProvider.credential(user.email, password);
        reauthenticateWithCredential(user, credentials);
        await updatePassword(user, newPassword);
        onClose();
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error actualizando contraseña. Intente más tarde",
        });
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Contraseña Actual"
        secureTextEntry={true}
        rightIcon={{
          type: "material-community",
          name: "eye-off-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Contraseña Nueva"
        secureTextEntry={true}
        rightIcon={{
          type: "material-community",
          name: "eye-off-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) => formik.setFieldValue("newPassword", text)}
        errorMessage={formik.errors.newPassword}
      />
      <Input
        placeholder="Confirmar Contraseña Nueva"
        secureTextEntry={true}
        rightIcon={{
          type: "material-community",
          name: "eye-off-outline",
          color: "#c2c2c2",
        }}
        onChangeText={(text) =>
          formik.setFieldValue("confirmNewPassword", text)
        }
        errorMessage={formik.errors.confirmNewPassword}
      />
      <Button
        title="Cambiar Contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
