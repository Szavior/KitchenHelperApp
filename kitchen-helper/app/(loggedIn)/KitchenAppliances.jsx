import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  PaperProvider,
  TextInput,
  List,
  Checkbox,
  Searchbar,
} from "react-native-paper";
import { Link } from "expo-router";
import Header from "../../components/Header";

const defaultAppliances = [
  { id: 1, name: "Oven", isChecked: true },
  { id: 2, name: "Stove", isChecked: true },
  { id: 3, name: "Air Frier", isChecked: false },
  { id: 4, name: "Frier", isChecked: false },
  { id: 5, name: "Microwave", isChecked: true },
  { id: 6, name: "Toaster", isChecked: false },
  { id: 7, name: "Blender", isChecked: false },
  { id: 8, name: "Food Processor", isChecked: false },
  { id: 9, name: "Slow Cooker", isChecked: false },
  { id: 10, name: "Juicer", isChecked: false },
  { id: 11, name: "Food Dehydrator", isChecked: false },
  { id: 12, name: "Food Dehydrator", isChecked: false },
  { id: 13, name: "Food Dehydrator", isChecked: false },
  { id: 14, name: "Food Dehydrator", isChecked: false },
  { id: 15, name: "Food Dehydrator", isChecked: false },
  { id: 16, name: "Food Dehydrator", isChecked: false },
  { id: 17, name: "Food Dehydrator", isChecked: false },
  { id: 18, name: "Food Dehydrator", isChecked: false },
  { id: 19, name: "Food Dehydrator", isChecked: false },
  { id: 20, name: "Food Dehydrator", isChecked: false },
  { id: 21, name: "Food Dehydrator", isChecked: false },
];

export default function KitchenAppliances() {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliances, setAppliances] = useState(defaultAppliances);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Implement your search logic here
    // Update the ingredients list based on the search query
  };

  const handleCheckboxToggle = (appliancesId) => {
    // Update the isChecked status of the appliance
    setAppliances((prevAppliances) =>
      prevAppliances.map((appliance) =>
      appliance.id === appliancesId
          ? { ...appliance, isChecked: !appliance.isChecked }
          : appliance
      )
    );
  };

  return (
    <PaperProvider style={styles.main}>
      <Header title="Manage Kitchen Appliances" />
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
      />
      <ScrollView style={styles.list}>
        {appliances.map((item) => 
          <Checkbox.Item
            key={item.id}
            label={item.name}
            status={item.isChecked ? 'checked' : 'unchecked'}
            onPress={() => handleCheckboxToggle(item.id)}
          />
        )}
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#d5e3fe",
  },
  list: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    margin: 4,
    padding: 16,
  },
});
