import React from "react";
import { StyleSheet, Text } from "react-native";
import { WP } from "../Utils/utils";

export const Heading = (props) => {
  const { text } = props;

  return <Text style={styles.text}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: WP(4.5),
    fontWeight: "bold",
    marginTop: 30,
    paddingHorizontal: 31,
  },
});
