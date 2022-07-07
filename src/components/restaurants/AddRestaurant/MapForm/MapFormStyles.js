import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: 550,
  },

  mapActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  btnContainerSave: {
    paddingRight: 5,
    width: "50%",
  },

  btnSave: {
    backgroundColor: "#00a680",
  },

  btnContainerCancel: {
    paddingLeft: 5,
    width: "50%",
  },

  btnCancel: {
    backgroundColor: "#a60d0d",
  },
});
