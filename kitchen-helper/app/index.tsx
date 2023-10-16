import { StyleSheet, View } from "react-native";
import { PaperProvider, Text, Button } from "react-native-paper";
import { Link } from "expo-router";
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
        <Link href="/login/emailLogin" asChild>
          <Button
            mode="contained"
            buttonColor="#8271a5"
            textColor="white"
            style={styles.emailBtn}
          >
            Sign In with Email
          </Button>
        </Link>
        <Link href="/login/createAccount" asChild>
          <Button
            mode="contained"
            buttonColor="#8271a5"
            textColor="white"
            style={styles.emailBtn}
          >
            Sign Up
          </Button>
        </Link>
        <View style={styles.btnContainer}>
          <Link href="/login/emailLogin" asChild>
            <Button
              icon="google"
              mode="contained"
              buttonColor="#1a191e"
              textColor="white"
              style={{ marginRight: 16 }}
            >
              Google
            </Button>
          </Link>
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
