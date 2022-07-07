import React from "react";
import { View, Alert } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuid } from "uuid";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { styles } from "./UploadImageFormStyles";

export default function UploadImageForm(props) {
  const { formik } = props;

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, "restaurants/" + uuid());
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log(snapshot);
    });
  };

  return (
    <>
      <View style={styles.viewImage}>
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
      </View>
    </>
  );
}
