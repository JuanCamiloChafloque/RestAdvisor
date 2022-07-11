import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserNotLogged from "../../components/favorites/UserNotLogged/UserNotLogged";

export default function FavoritesScreen() {
  const auth = getAuth();
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  if (!hasLogged) return <UserNotLogged />;

  return (
    <View>
      <Text>FavoritesScreen</Text>
    </View>
  );
}
