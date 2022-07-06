import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import UserGuestScreen from "./UserGuestScreen/UserGuestScreen";
import UserLoggedScreen from "./UserLoggedScreen/UserLoggedScreen";
import LoadingModal from "../../components/shared/LoadingModal/LoadingModal";

export default function AccountScreen() {
  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false);
    });
  }, []);

  if (hasLogged === null) {
    return <LoadingModal show text="Cargando" />;
  }

  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />;
}
