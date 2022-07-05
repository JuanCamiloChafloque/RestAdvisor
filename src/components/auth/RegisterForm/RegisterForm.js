import React, { useState } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Input, Icon, Button, Text } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";
import { styles } from "./RegisterFormStyles";
import { screen } from "../../../utils/screenName";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("La contraseña es obligatoria"),
      repeatPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("password")], "Las contraseñas tienen que ser iguales"),
    });
  };

  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const auth = getAuth();
        await createUserWithEmailAndPassword(
          auth,
          formValue.email,
          formValue.password
        );
        navigation.navigate(screen.account.account);
      } catch (error) {
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al registrarse, intentelo más tarde",
        });
        console.log(error);
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Correo electronico"
        containerStyle={styles.input}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Input
        placeholder="Repetir contraseña"
        secureTextEntry={showPassword ? false : true}
        containerStyle={styles.input}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.icon}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        errorMessage={formik.errors.repeatPassword}
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnRegister}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
