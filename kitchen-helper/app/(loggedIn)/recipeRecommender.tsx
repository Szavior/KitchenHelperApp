import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, TextInput, Button } from "react-native-paper";
import { Link } from "expo-router";
import React from "react";

export default function recipeRecommender() {
  const [text, setText] = React.useState("");
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="displayLarge" style={styles.lblText}>
          Recipe Recommender
        </Text>
        <Link href="/(loggedIn)/Dashboard" asChild>
          <Button
            mode="contained"
            buttonColor="#8271a5"
            textColor="white"
            style={styles.emailBtn}
          >
            Back to Dashboard
          </Button>
        </Link>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d5e3fe",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  emailBtn: {
    marginTop: 16,
  },
  lblText: {
    color: "#8271a5",
  },
  smallText: {
    color: "#8271a5",
    marginTop: 16,
  },
});
