import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  PaperProvider,
  List,
  Searchbar,
  IconButton,
  TouchableRipple,
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
      <Header title="Manage Inventory" />
      <View style={styles.main}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={styles.searchBar}
        />
        <ScrollView style={styles.list}>
          {ingredients.map((item) => 
            <TouchableRipple key={item.id}>
              <List.Item
                title={`${item.name} | ${item.count}`}
                right={props =>
                  <View style={styles.buttonContainer}>
                    <IconButton {...props} 
                      icon="plus"
                      style={styles.plus}
                      mode="contained" 
                      size={24}
                      onPress={() => handlePlusClick(item)}
                    />
                    <IconButton {...props} 
                      icon="minus"
                      style={styles.minus}
                      mode="contained"
                      size={24}
                      onPress={() => handleMinusClick(item)}
                    />
                  </View>
                }
              />
            </TouchableRipple>
          )}
        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#d5e3fe",
    padding: 16,
  },
  searchBar: {
    margin: 4,
    padding: 16,
  },
  list: {
    flex: 1,
    padding: 16
  },
  buttonContainer: {
    flexDirection: "row",
  },
  plus: {
    backgroundColor: "green"
  },
  minus: {
    backgroundColor: "red"
  }
});
