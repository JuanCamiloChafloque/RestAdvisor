import React from "react";
import { View, Text } from "react-native";
import Modal from "../../../shared/Modal/Modal";
import { styles } from "./MapFormStyles";

export default function MapForm(props) {
  const { show, close } = props;
  return <Modal show={show} close={close}></Modal>;
}
