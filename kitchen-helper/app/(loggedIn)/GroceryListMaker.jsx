import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import {
  PaperProvider,
  Text,
  TextInput,
  Button,
  List,
  Checkbox,
} from "react-native-paper";
import { Link } from "expo-router";
import Header from "../../components/Header";

const predefinedIngredients = [
  { id: 1, name: "Milk", isChecked: false },
  { id: 2, name: "Pop-Tarts", isChecked: false },
  { id: 3, name: "Eggs", isChecked: false },
  { id: 4, name: "Sausages", isChecked: false },
  { id: 5, name: "Sub Rolls", isChecked: false },
  { id: 6, name: "Cream", isChecked: false },
  { id: 7, name: "Brown Sugar", isChecked: false },
  { id: 8, name: "Shredded Cheese", isChecked: false },
];

export default function GroceryListMaker() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredients, setIngredients] = useState(predefinedIngredients);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement your search logic here
    // Update the ingredients list based on the search query
  };

  const renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      titleStyle={{ color: "black" }}
      style={
        item.isChecked
          ? { ...styles.checkedItem, backgroundColor: "green" }
          : styles.uncheckedItem
      }
      right={() => (
        <View style={styles.checkboxContainer}>
          <Button
            icon="plus"
            mode="contained"
            onPress={() => handlePlusClick(item.id)}
            style={styles.plusButton}
            labelStyle={styles.buttonLabel}
          />
          <Button
            icon="minus"
            mode="contained"
            onPress={() => handleMinusClick(item.id)}
            style={styles.minusButton}
            labelStyle={styles.buttonLabel}
          />
        </View>
      )}
    />
  );

  const handlePlusClick = (ingredientId) => {
    // Implement logic for handling the plus button click
    // Update the isChecked status of the ingredient
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === ingredientId
          ? { ...ingredient, isChecked: true }
          : ingredient
      )
    );
  };

  const handleMinusClick = (ingredientId) => {
    // Implement logic for handling the minus button click
    // Update the isChecked status of the ingredient
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === ingredientId
          ? { ...ingredient, isChecked: false }
          : ingredient
      )
    );
  };

  return (
    <PaperProvider>
      <Header title="Grocery List Maker" />
      <View style={styles.container}>
        <FlatList
          data={ingredients}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
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
    padding: 16,
  },
  searchBar: {
    width: "100%",
    marginVertical: 16,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  checkedItem: {
    borderColor: "green", // Add a green outline for checked items
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 4,
  },
  uncheckedItem: {
    borderColor: "black", // Add a red outline for unchecked items
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 4,
  },
  emailBtn: {
    marginTop: 16,
  },
  lblText: {
    color: "#8271a5",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  plusButton: {
    marginRight: 8,
    backgroundColor: "green", // Set background color for plus button
    borderRadius: 50, // Make the button circular
    width: 40, // Set a fixed width for the circular button
    height: 40, // Set a fixed height for the circular button
    justifyContent: "center",
    alignItems: "center",
  },
  minusButton: {
    backgroundColor: "red", // Set background color for minus button
    borderRadius: 50, // Make the button circular
    width: 40, // Set a fixed width for the circular button
    height: 40, // Set a fixed height for the circular button
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLabel: {
    color: "white", // Set text color for the button label
  },
});
