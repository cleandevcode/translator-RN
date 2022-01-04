import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import OriginalText from "./originalText";
import Candidates from "./candidates";
import TargetText from "./targetText";
import { MainModel } from "../models/data.model";
import AnswerCheckButton from "./answerCheckButton";

const MainContainer: React.FC<MainModel> = ({ data, handleNextSentence }) => {
  const { target, candidates, original, aIndex } = data;
  const [candidate, setCandidate] = useState("");
  const [correctAnswer, setCorrectness] = useState(false);
  const [checkable, setCheckable] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleChangeCandidate = (candidate: string) => {
    setCandidate(candidate);
  };

  const handleCheckAnswer = () => {
    handleNextStep();
  };

  const handleContinue = () => {
    setAnswer(target.split(" ")[aIndex]);
    setCheckable(true);
    if (target.split(" ")[aIndex] === candidate) {
      setCorrectness(true);
    } else {
      setCorrectness(false);
    }
  };

  const handleNextStep = () => {
    setCandidate("");
    handleNextSentence();
    setCheckable(false);
    setAnswer("");
  };

  return (
    <View style={[styles.mainContent, { padding: checkable ? 0 : 20 }]}>
      <View style={[styles.textContent, { padding: checkable ? 20 : 0 }]}>
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
          checkable={checkable}
        />
      </View>
      {checkable ? (
        <AnswerCheckButton
          correct={correctAnswer}
          answer={answer}
          handleCheckAnswer={handleCheckAnswer}
        />
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: candidate.length === 0 ? "#496D79" : "#4BF0FF",
            },
          ]}
          disabled={candidate.length === 0}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            {candidate.length === 0 ? "CONTINUE" : "CHECK ANSWER"}
          </Text>
        </TouchableOpacity>
      )}
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
    marginBottom: 20,
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
