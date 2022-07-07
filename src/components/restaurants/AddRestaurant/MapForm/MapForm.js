import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Toast from "react-native-toast-message";
import Modal from "../../../shared/Modal/Modal";
import { styles } from "./MapFormStyles";

export default function MapForm(props) {
  const { show, close, formik } = props;
  const [location, setLocation] = useState({
    latitude: 0.001,
    longitude: 0.001,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Toast.show({
          type: "info",
          position: "bottom",
          text1: "Tienes que ir a ajustes de la app y activar la localización",
        });
        return;
      }
      const locationTemp = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: locationTemp.coords.latitude,
        longitude: locationTemp.coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    })();
  }, []);

  const saveLocation = () => {
    formik.setFieldValue("location", location);
    close();
  };

  return (
    <Modal show={show} close={close}>
      <View>
        <MapView
          initialRegion={location}
          showsUserLocation={true}
          style={styles.map}
          onRegionChange={(locationTemp) => setLocation(locationTemp)}
        >
          <MapView.Marker draggable coordinate={location} />
        </MapView>
        <View style={styles.mapActions}>
          <Button
            title="Guardar"
            containerStyle={styles.btnContainerSave}
            buttonStyle={styles.btnSave}
            onPress={saveLocation}
          />
          <Button
            title="Cerrar"
            containerStyle={styles.btnContainerCancel}
            buttonStyle={styles.btnCancel}
            onPress={close}
          />
        </View>
      </View>
    </Modal>
  );
}
