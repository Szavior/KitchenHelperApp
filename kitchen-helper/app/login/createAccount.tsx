import { StyleSheet, View, Alert } from "react-native";
import { PaperProvider, Text, TextInput, Button } from "react-native-paper";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "../../firebaseConfig";
import React, { useState } from "react";

export default function createAccount() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const userRef = doc(database, "users", user.uid);
      await setDoc(userRef, {
        displayName: name,
        email: email,
        uid: user.uid,
        phoneNumber: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PaperProvider>
      <View style={styles.container}>
        <Text variant="displayLarge" style={styles.lblText}>
          Sign Up
        </Text>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(password) => setPassword(password)}
        />
        <Link href="/(loggedIn)/dashboard" asChild>
          <Button
            mode="contained"
            buttonColor="#8271a5"
            textColor="white"
            style={styles.emailBtn}
            onPress={onHandleSignup}
          >
            Sign Up with Email
          </Button>
        </Link>
        <Text variant="bodySmall" style={styles.smallText}>
          Forgot your Password?
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
