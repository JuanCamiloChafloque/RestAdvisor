import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchBar, ListItem, Avatar, Icon, Text } from "react-native-elements";
import {
  collection,
  query,
  startAt,
  endAt,
  limit,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { size, map } from "lodash";
import LoadingModal from "../../components/shared/LoadingModal/LoadingModal";
import { db } from "../../utils/firebase";
import { screen } from "../../utils/screenName";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState(null);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      );

      const snap = await getDocs(q);
      setResults(snap.docs);
    })();
  }, [searchText]);

  const goToRestaurant = (id) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.details,
      params: {
        id: id,
      },
    });
  };

  return (
    <>
      <SearchBar
        placeholder="Busca tu restaurante"
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <ScrollView>
        {size(results) === 0 ? (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>No se han encontrado resultados</Text>
          </View>
        ) : (
          map(results, (result) => {
            const data = result.data();
            return (
              <ListItem
                key={data.id}
                bottomDivider
                onPress={() => goToRestaurant(data.id)}
              >
                <Avatar source={{ uri: data.images[0] }} rounded />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type="material-community" name="chevron-right" />
              </ListItem>
            );
          })
        )}
      </ScrollView>
    </>
  );
}
