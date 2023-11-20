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

predefinedIngredients = [
  { id: 1, name: "Milk", count: 1 },
  { id: 2, name: "Pop-Tarts", count: 0 },
  { id: 3, name: "Eggs", count: 12 },
  { id: 4, name: "Sausages", count: 6 },
  { id: 5, name: "Sub Rolls", count: 20 },
  { id: 6, name: "Cream", count: 1 },
  { id: 7, name: "Brown Sugar", count: 2 },
  { id: 8, name: "Shredded Cheese", count: 4 },
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
      title={`${item.name} | ${item.count}` }
      titleStyle={{ color: "black" }}
      style={ styles.item }
      right={() => (
        <View style={styles.buttonContainer}>
          <Button
            icon="plus"
            mode="contained"
            onPress={() => handlePlusClick(item)}
            style={styles.plusButton}
            labelStyle={styles.buttonLabel}
          />
          <Button
            icon="minus"
            mode="contained"
            onPress={() => handleMinusClick(item)}
            style={styles.minusButton}
            labelStyle={styles.buttonLabel}
          />
        </View>
      )}
    />
  );

  const handlePlusClick = (item) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.id === item.id ? { ...ingredient, count: item.count + 1 } : ingredient
      )
    );
  };

  const handleMinusClick = (item) => {
    setIngredients(prevIngredients =>
      prevIngredients.map(ingredient =>
        ingredient.id === item.id ? { ...ingredient, count: item.count - 1 } : ingredient
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
  item: {
    borderColor: "black", // Add a red outline for unchecked items
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 4,
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
