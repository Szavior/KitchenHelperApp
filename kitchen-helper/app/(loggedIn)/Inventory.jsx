import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { PaperProvider, TextInput } from "react-native-paper";
import Header from "../../components/Header";
import { Checkbox } from "react-native-paper";

const remainingIngredients = [
  { id: 1, name: "Milk", remaining: 1, isChecked:false },
  { id: 2, name: "Pop-Tarts", remaining: 0, isChecked:false },
  { id: 3, name: "Eggs", remaining: 12, isChecked:false },
  { id: 4, name: "Sausages", remaining: 6, isChecked:false },
  { id: 5, name: "Sub Rolls", remaining: 7, isChecked:false },
  { id: 6, name: "Cream", remaining: 1, isChecked:false },
  { id: 7, name: "Brown Sugar", remaining: 2, isChecked:false },
  { id: 8, name: "Shredded Cheese", remaining: 4 , isChecked:false},
];

export default function Inventory() {
  const tableHead = ["Item", "Remaining", "Add to grocery list"];
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(remainingIngredients);
  const [list, setList] = useState([]); 

  // handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filteredItems = remainingIngredients.filter((item) =>
        Object.values(item).some(
          (value) =>
            typeof value === 'string' &&-
            value.toLowerCase().includes(query.toLowerCase())
        )
      );
      setFilteredData(filteredItems);
    } else {
      setFilteredData(remainingIngredients);
    }
  };

  const handleCheckboxToggle = (itemId) => {
    setFilteredData((prevData) =>
      prevData.map((item) =>
        item.id === itemId
          ? { ...item, isChecked: !item.isChecked }
          : item
      )
    );

    setList((prevList) =>
      prevList.some((listItem) => listItem.id === itemId)
        ? prevList.filter((listItem) => listItem.id !== itemId)
        : [...prevList, { ...filteredData.find((item) => item.id === itemId) }]
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
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            {tableHead.map((header, index) => (
              <View key={index} style={styles.headerItem}>
                <Text style={styles.headerText}>{header}</Text>
              </View>
            ))}
          </View>
          <ScrollView style={styles.scrollContainer}>
            {filteredData.map((item, index) => {
              const isAdded = list.some((listItem) => listItem.id === item.id);
              return (
                <View
                  key={index}
                  style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
                >
                  <View style={styles.cell}>
                    <Text style={[styles.text, { textAlign: 'left' }]}>{item.name}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={[styles.text, { textAlign: 'left' }]}>{item.remaining}</Text>
                  </View>
                  <View style={[styles.cell, { alignItems: 'flex-start', flexDirection: 'row' }]}>
                    <Checkbox
                      status={item.isChecked ? 'checked' : 'unchecked'}
                      onPress={() => handleCheckboxToggle(item.id)}
                      color="#8271a5"
                    />
                    <Text style={{ marginLeft: 4, alignSelf: 'center' }}>
                      {isAdded ? 'Added' : 'Not Added'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
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
    padding: 20,
  },
  searchBar: {
    width: "100%",
    marginVertical: 16,
  },
  tableContainer: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f8ff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    textAlign: "left",
  },
  headerItem: {
    flex: 1,
    padding: 10,
    alignItems: "flex-start", // Adjust alignment for the header items
  },
  headerText: {
    fontWeight: "bold",
    color: "#8271a5",
    textAlign: "left", // Ensure left alignment for the header text
  },
  scrollContainer: {
    maxHeight: 400, // Set max height for scroll
  },
  rowEven: {
    backgroundColor: "#edf3fc",
    flexDirection: "row",
  },
  rowOdd: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  text: {
    color: "#8271a5",
  },
});