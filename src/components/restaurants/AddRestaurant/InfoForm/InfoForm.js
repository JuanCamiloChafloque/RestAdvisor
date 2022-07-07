import React from "react";
import { View } from "react-native";
import { Input } from "react-native-elements";
import { styles } from "./InfoFormStyles";

export default function InfoForm(props) {
  const { formik } = props;
  return (
    <View style={styles.content}>
      <Input
        placeholder="Nombre del Restaurante"
        onChangeText={(text) => formik.setFieldValue("name", text)}
        errorMessage={formik.errors.name}
      />
      <Input
        placeholder="Dirección del Restaurante"
        onChangeText={(text) => formik.setFieldValue("address", text)}
        errorMessage={formik.errors.address}
      />
      <Input
        placeholder="Telefono del Restaurante"
        onChangeText={(text) => formik.setFieldValue("phone", text)}
        errorMessage={formik.errors.phone}
      />
      <Input
        placeholder="Correo Electrónico del Restaurante"
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Descripción del Restaurante"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChangeText={(text) => formik.setFieldValue("description", text)}
        errorMessage={formik.errors.description}
      />
    </View>
  );
}
