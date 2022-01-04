import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

interface AnswerCheckButtonModel {
  correct: boolean;
  answer: string;
  handleCheckAnswer: any;
}

const AnswerCheckButton: React.FC<AnswerCheckButtonModel> = ({
  correct,
  answer,
  handleCheckAnswer,
}) => {
  const [fadeTop] = useState(new Animated.Value(0));

  useEffect(() => {
    //@ts-ignore
    Animated.timing(fadeTop, {
      toValue: 1,
      duration: 100,
    }).start();
  }, [correct]);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: correct ? "#4BF0FF" : "#ff7575",
          marginBottom: fadeTop.interpolate({
            inputRange: [0, 1],
            outputRange: [-120, 0],
          }),
        },
      ]}
    >
      <Text style={styles.title}>
        {correct ? "Great Job!" : `Answer:  ${answer}`}
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleCheckAnswer}>
        <Text
          style={[
            styles.buttonText,
            { color: correct ? "#4BF0FF" : "#ff7575" },
          ]}
        >
          CONTINUE
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AnswerCheckButton;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Poppins_400Regular",
  },
  button: {
    paddingVertical: 16,
    width: "100%",
    borderRadius: 30,
    textAlign: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
});
