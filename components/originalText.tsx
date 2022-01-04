import React from "react";
import { Text, StyleSheet } from "react-native";
import { TextModel } from "../models/data.model";

const OriginalText: React.FC<TextModel> = ({ index, arrayText }) => {
  return (
    <Text style={styles.originalText}>
      {arrayText.map((text, idx) => {
        if (idx === index) {
          return (
            <Text key={idx} style={styles.boldText}>
              {text + " "}
            </Text>
          );
        }
        return <Text key={idx}>{text + " "}</Text>;
      })}
    </Text>
  );
};

export default OriginalText;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  originalText: {
    fontSize: 18,
    fontFamily: "Poppins_400Regular",
    color: "white",
  },
  boldText: {
    fontWeight: "bold",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
});
