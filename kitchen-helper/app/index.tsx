import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, Button } from "react-native-paper";
import React from "react";

export default function index() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="displayLarge" style={styles.lblText}>
          Grocery Genie
        </Text>
        <Text variant="displaySmall" style={styles.lblText}>
          The only kitchen logger app you need
        </Text>
        <Button
          mode="contained"
          buttonColor="#8271a5"
          textColor="white"
          style={styles.emailBtn}
        >
          Sign in with Email
        </Button>
        <View style={styles.btnContainer}>
          <Button
            icon="google"
            mode="contained"
            buttonColor="#1a191e"
            textColor="white"
            style={{ marginRight: 16 }}
          >
            Google
          </Button>
          <Button
            icon="apple"
            mode="contained"
            buttonColor="#1a191e"
            textColor="white"
          >
            Apple ID
          </Button>
        </View>
        <Text variant="bodySmall" style={styles.smallText}>
          The only kitchen logger app you need
        </Text>
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
