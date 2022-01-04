import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  Animated,
  View,
  Easing,
} from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts, Poppins_400Regular } from "@expo-google-fonts/poppins";
import { useEffect, useState } from "react";
import { firebase } from "./firebase";
import { TranslateModel } from "./models/data.model";
import MainContainer from "./components/mainContainer";

const demo =
  "helo hello heello sdf kh kihiouh kljkjhn ljljk lkjlkj lkjlkj iyug iughih iuh";

export default function App() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular });
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<TranslateModel[]>([]);
  const [finish, setFinish] = useState(false);
  const [rotate] = useState(new Animated.Value(0));
  const [fontSize] = useState(new Animated.Value(0));

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (finish) {
      //@ts-ignore
      Animated.timing(rotate, {
        toValue: 1,
        duration: 1000,
      }).start();
      //@ts-ignore
      Animated.timing(fontSize, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }).start();
    }
  }, [finish]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    const dataRef = firebase.firestore().collection("en");
    dataRef.onSnapshot((querySnapshot) => {
      const result: any[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        result.push(data);
      });
      setData(result);
      setLoading(false);
    });
  };

  const handleChangeIndex = () => {
    if (index < data.length - 1) {
      setIndex(index + 1);
    } else {
      setFinish(true);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={finish ? styles.finishContent : styles.topContent}>
        {finish && (
          <Animated.View
            style={{
              transform: [
                {
                  rotateZ: rotate.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
              ],
            }}
          >
            <Animated.Text
              style={[
                styles.finishText,
                {
                  fontSize: fontSize.interpolate({
                    inputRange: [0, 1],
                    outputRange: [12, 24],
                  }),
                },
              ]}
            >
              Great Job!
            </Animated.Text>
          </Animated.View>
        )}
      </View>
      {loading && <ActivityIndicator color={"white"} size="large" />}
      {!loading && data.length > 0 && !finish && (
        <MainContainer
          data={data[index]}
          handleNextSentence={handleChangeIndex}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#64C4F3",
  },
  topContent: {
    flex: 1,
  },
  finishContent: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  finishText: {
    color: "white",

    fontFamily: "Poppins_400Regular",
    fontWeight: "bold",
  },
  targetContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    paddingVertical: 15,
  },
});
