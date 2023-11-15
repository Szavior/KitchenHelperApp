import React from "react";
import { StyleSheet, View, TouchableHighlight } from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Text,
  Provider as PaperProvider,
} from "react-native-paper";
import { Link } from "expo-router";

export default function Dashboard() {
  const user = {
    name: "John Doe", // Replace with actual user data
  };

  const familyMembers = [
    "Family Member 1",
    "Family Member 2",
    "Family Member 3",
  ]; // Replace with actual family members data

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Avatar.Text size={40} label="JD" />
          <Text style={styles.lblText}>Hello, {user.name}</Text>
        </View>
        <View style={styles.cardsContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Title>Inventory</Title>
              <Paragraph>View and manage your inventory</Paragraph>
            </Card.Content>
            <Card.Actions>
              <TouchableHighlight
                underlayColor="#fff"
                onPress={() => handlePress("/(loggedIn)/Inventory")}
              >
                <Button mode="contained" style={styles.cardButton}>
                  View Inventory
                </Button>
              </TouchableHighlight>
            </Card.Actions>
          </Card>
          {/* Repeat the pattern for other cards */}
        </View>
        <TouchableHighlight
          underlayColor="#fff"
          onPress={() => handlePress("/")}
        >
          <Button mode="contained" style={styles.familyButton}>
            View Family Members
          </Button>
        </TouchableHighlight>
        <TouchableHighlight
          underlayColor="#fff"
          onPress={() => handlePress("../")}
        >
          <Button mode="contained" style={styles.logoutButton}>
            Logout
          </Button>
        </TouchableHighlight>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#d5e3fe",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
  },
  lblText: {
    marginLeft: 8,
    color: "black",
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    margin: 8,
  },
  cardButton: {
    marginTop: 8,
  },
  familyButton: {
    marginTop: 16,
    backgroundColor: "#8271a5",
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: "#8271a5",
  },
});
