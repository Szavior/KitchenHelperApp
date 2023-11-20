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
  { id: 2, name: "Air Frier", isChecked: false },
  { id: 3, name: "Frier", isChecked: false },
  { id: 4, name: "Microwave", isChecked: true },
  { id: 5, name: "Blender", isChecked: false },
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
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
      />
      {appliances.map((item) => 
        <Checkbox.Item
          key={ item.id }
          label={ item.name }
          status={ item.isChecked ? 'checked' : 'unchecked'}
          onPress={() => handleCheckboxToggle(item.id)}
        />
      )} 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d5e3fe",
    padding: 16,
  },
  searchBar: {
    margin: 4,
  },
  list: {
    flex: 1,
    width: "100%",
  },
  checkedAppliance: {
    borderColor: "green", // Add a green outline for checked items
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 4,
  },
  uncheckedAppliance: {
    borderColor: "black", // Add a red outline for unchecked items
    borderWidth: 2,
    borderRadius: 8,
    marginVertical: 4,
  },
});
