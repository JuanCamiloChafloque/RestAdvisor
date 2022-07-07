import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native-elements";
import CarouselSnap from "react-native-snap-carousel";
import { styles } from "./CarouselStyles";

export default function Carousel(props) {
  const { images, width, height } = props;

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
      />
    </View>
  );
}
