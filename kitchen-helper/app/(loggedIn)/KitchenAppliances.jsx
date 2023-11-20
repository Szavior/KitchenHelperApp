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

  const renderItem = ({ item }) => (
    <List.Item
      title={item.name}
      titleStyle={{ color: "black" }} // Set text color to black
      style={item.isChecked ? styles.checkedAppliance : styles.uncheckedAppliance} // Apply different styles for checked and unchecked appliances
      right={() => (
        <Checkbox
          status={item.isChecked ? "checked" : "unchecked"}
          onPress={() => handleCheckboxToggle(item.id)}
        />
      )}
    />
  );

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
    <PaperProvider>
      <Header title="Manage Kitchen Appliances" />
      <View style={styles.container}>
        <TextInput
            label="Search"
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchBar}
        />
        <FlatList
          data={appliances}
          renderItem={renderItem}
          keyExtractor={(appliance) => appliance.id.toString()}
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
