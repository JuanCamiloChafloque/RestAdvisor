import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import openMap from "react-native-open-maps";
import { styles } from "./MapStyles";

export default function Map(props) {
  const { location, name } = props;

  const openAppMap = () => {
    openMap({
      latitude: location.latitude,
      longitude: location.longitude,
      zoom: 19,
      query: name,
    });
  };

  return (
    <MapView
      initialRegion={location}
      style={styles.content}
      onPress={openAppMap}
    >
      <Marker coordinate={location} />
    </MapView>
  );
}