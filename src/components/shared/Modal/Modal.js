import React from "react";
import { View, Text } from "react-native";
import { Overlay } from "react-native-elements";
import { styles } from "./ModalStyles";

export default function Modal(props) {
  const { show, close, children } = props;
  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  );
}
