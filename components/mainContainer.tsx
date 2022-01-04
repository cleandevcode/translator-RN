import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import OriginalText from "./originalText";
import Candidates from "./candidates";
import TargetText from "./targetText";
import { MainModel } from "../models/data.model";

const MainContainer: React.FC<MainModel> = ({ data, handleNextSentence }) => {
  const { target, candidates, original, aIndex } = data;
  const [candidate, setCandidate] = useState("");
  const [correctAnswer, setCorrectness] = useState(false);

  const handleChangeCandidate = (candidate: string) => {
    setCandidate(candidate);
  };

  const handleCheckAnswer = () => {
    if (target.split(" ")[aIndex] === candidate) {
      setCorrectness(true);
      handleNextStep();
    } else {
      setCorrectness(false);
    }
  };

  const handleNextStep = () => {
    setCandidate("");
    handleNextSentence();
  };

  return (
    <View style={styles.mainContent}>
      <View style={styles.textContent}>
        <Text style={styles.note}>Fill in the missing word</Text>
        <OriginalText index={aIndex} arrayText={original.split(" ")} />
        <TargetText
          index={aIndex}
          arrayText={target.split(" ")}
          candidate={candidate}
        />
        <Candidates
          candidates={candidates}
          handleChangeCandidate={handleChangeCandidate}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: candidate.length === 0 ? "#496D79" : "#4BF0FF",
          },
        ]}
        disabled={candidate.length === 0}
        onPress={handleCheckAnswer}
      >
        <Text style={styles.buttonText}>
          {candidate.length === 0 ? "CONTINUE" : "CHECK ANSWER"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainContainer;

const styles = StyleSheet.create({
  mainContent: {
    flex: 5,
    backgroundColor: "#0C2745",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  textContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  note: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "white",
  },
  button: {
    paddingVertical: 16,
    width: "100%",
    borderRadius: 30,
    textAlign: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "white",
    fontFamily: "Poppins_400Regular",
  },
});
