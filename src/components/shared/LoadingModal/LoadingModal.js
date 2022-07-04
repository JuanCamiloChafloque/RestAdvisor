import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Overlay, Text } from "react-native-elements";
import { styles } from "./LoadingModalStyles";

export default function LoadingModal(props) {
  const { show = false, text } = props;
  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#00a680" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}
