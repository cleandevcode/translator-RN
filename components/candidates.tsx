import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CandidatesModel } from "../models/data.model";

const Candidates: React.FC<CandidatesModel> = ({
  candidates,
  handleChangeCandidate,
}) => {
  const [selectedText, setSelect] = useState("");

  const handleCandidate = (string: string) => {
    setSelect(string);
    handleChangeCandidate(string);
  };

  return (
    <View style={styles.container}>
      {candidates.map((candidate, idx) => (
        <TouchableOpacity
          style={[
            styles.candidateTextButton,
            {
              backgroundColor: candidate === selectedText ? "#76aab5" : "white",
            },
          ]}
          key={idx}
          onPress={() => handleCandidate(candidate)}
        >
          <Text
            style={[
              styles.candidateText,
              { color: candidate === selectedText ? "#76aab5" : "#0C2745" },
            ]}
          >
            {candidate}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Candidates;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    paddingVertical: 15,
  },
  candidateTextButton: {
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },
  candidateText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
  },
});
