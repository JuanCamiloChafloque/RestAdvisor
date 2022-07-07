import React, { useState } from "react";
import { ScrollView, Alert } from "react-native";
import { Icon, Avatar, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { v4 as uuid } from "uuid";
import { map } from "lodash";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import LoadingModal from "../../../shared/LoadingModal/LoadingModal";
import { styles } from "./UploadImageFormStyles";

export default function UploadImageForm(props) {
  const { formik } = props;
  const [loading, setLoading] = useState(false);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      setLoading(true);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storage = getStorage();
    const storageRef = ref(storage, "restaurants/" + uuid());
    uploadBytes(storageRef, blob).then((snapshot) => {
      updatePhotos(snapshot.metadata.fullPath);
    });
  };

  const updatePhotos = async (path) => {
    const storage = getStorage();
    const imageRef = ref(storage, path);
    const url = await getDownloadURL(imageRef);
    formik.setFieldValue("images", [...formik.values.images, url]);
    setLoading(false);
  };

  return (
    <>
      <ScrollView
        style={styles.viewImage}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
        {map(formik.values.images, (url) => (
          <Avatar
            key={url}
            source={{ uri: url }}
            containerStyle={styles.imageStyle}
          />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images}</Text>
      <LoadingModal show={loading} text="Subiendo imagen" />
    </>
  );
}
