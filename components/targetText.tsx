import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { TargetTextModel } from "../models/data.model";

const TargetText: React.FC<TargetTextModel> = ({
  index,
  arrayText,
  candidate,
}) => {
  return (
    <View
      style={[
        styles.container,
        { alignItems: candidate.length > 0 ? "center" : "stretch" },
      ]}
    >
      {arrayText.map((text, idx) => {
        if (idx === index) {
          if (candidate.length > 0) {
            return (
              <View key={idx} style={styles.candidateTextContent}>
                <Text style={styles.candidateText}>{candidate}</Text>
              </View>
            );
          }
          return <View key={idx} style={styles.candidateBlankContent}></View>;
        }
        return (
          <Text
            key={idx}
            style={[styles.germanText, { borderStyle: "dotted" }]}
          >
            {text + " "}
          </Text>
        );
      })}
    </View>
  );
};

export default TargetText;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",

    width: "100%",
    justifyContent: "center",
    paddingVertical: 15,
  },
  germanText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginRight: 10,
  },
  candidateBlankContent: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 80,
    marginRight: 10,
  },
  candidateTextContent: {
    borderRadius: 15,
    padding: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "white",
    marginRight: 10,
  },
  candidateText: {
    color: "#0c2745",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
  },
});
