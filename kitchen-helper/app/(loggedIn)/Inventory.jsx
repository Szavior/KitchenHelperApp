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

export default function Inventory() {
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
      titleStyle={{ color: "black" }} // Set text color to black
      style={item.isChecked ? styles.checkedItem : styles.uncheckedItem} // Apply different styles for checked and unchecked items
      right={() => (
        <Checkbox
          status={item.isChecked ? "checked" : "unchecked"}
          onPress={() => handleCheckboxToggle(item.id)}
        />
      )}
    />
  );

  const handleCheckboxToggle = (ingredientId) => {
    // Update the isChecked status of the ingredient
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === ingredientId
          ? { ...ingredient, isChecked: !ingredient.isChecked }
          : ingredient
      )
    );
  };

  return (
    <PaperProvider>
      <Header title="Fridge" />
      <View style={styles.container}>
        <TextInput
          label="Search"
          value={searchQuery}
          onChangeText={handleSearch}
          style={styles.searchBar}
        />
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
});
