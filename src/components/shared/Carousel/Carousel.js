import React, { useState } from "react";
import { View } from "react-native";
import { Image } from "react-native-elements";
import CarouselSnap, { Pagination } from "react-native-snap-carousel";
import { size } from "lodash";
import { styles } from "./CarouselStyles";

export default function Carousel(props) {
  const { images, width, height, hideDots } = props;
  const [index, setIndex] = useState(0);

  const renderItem = ({ item }) => (
    <Image source={{ uri: item }} style={{ height, width }} />
  );

  const pagination = () => {
    return (
      <Pagination
        dotsLength={size(images)}
        activeDotIndex={index}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        containerStyle={styles.dotContainer}
        dotStyle={styles.dot}
      />
    );
  };

  return (
    <View style={styles.content}>
      <CarouselSnap
        layout="default"
        data={images}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setIndex(index)}
      />
      {!hideDots && pagination()}
    </View>
  );
}
