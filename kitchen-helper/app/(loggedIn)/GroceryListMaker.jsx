import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import {PaperProvider,Button,Searchbar,} from "react-native-paper";
import { Table, Row } from 'react-native-table-component';
import Header from "../../components/Header";
import { Checkbox } from "react-native-paper";

const initialData = [
  { id: 1, section: "Dairy", item: "Milk", quantity: "5 liters", isChecked: false },
  { id: 2, section: "Dairy", item: "Cheese", quantity: "2 kg", isChecked: false },
  { id: 3, section: "Meat", item: "Chicken", quantity: "2 kg", isChecked: false },
  { id: 4, section: "Meat", item: "Beef", quantity: "3 kg", isChecked: false },
  { id: 5, section: "Junk Food", item: "Chips", quantity: "1 bag", isChecked: false },
  { id: 6, section: "Junk Food", item: "Chocolate", quantity: "2 bars", isChecked: false },
  { id: 7, section: "Junk Food", item: "Coke", quantity: "1 bottle", isChecked: false },
  { id: 8, section: "Vegetables", item: "Carrots", quantity: "500g", isChecked: false },
  { id: 9, section: "Vegetables", item: "Potatoes", quantity: "1 kg", isChecked: false },
  { id: 10, section: "Fruits", item: "Apples", quantity: "1 kg", isChecked: false },
  { id: 11, section: "Fruits", item: "Bananas", quantity: "6 piece(s)", isChecked: false },
  { id: 12, section: "Grains", item: "Rice", quantity: "2 kg", isChecked: false },
  { id: 13, section: "Grains", item: "Pasta", quantity: "500g", isChecked: false },
  { id: 14, section: "Beverages", item: "Tea", quantity: "100 tea bags", isChecked: false },
  { id: 15, section: "Beverages", item: "Coffee", quantity: "500g", isChecked: false },
  { id: 16, section: "Condiments", item: "Salt", quantity: "500g", isChecked: false },
  { id: 17, section: "Condiments", item: "Pepper", quantity: "200g", isChecked: false },
  { id: 18, section: "Canned Goods", item: "Tomato Sauce", quantity: "500g", isChecked: false },
  { id: 19, section: "Canned Goods", item: "Canned Beans", quantity: "400g", isChecked: false },
  { id: 20, section: "Spices", item: "Cinnamon", quantity: "100g", isChecked: false },
  { id: 21, section: "Spices", item: "Paprika", quantity: "100g", isChecked: false },
  { id: 22, section: "Deli", item: "Sliced Ham", quantity: "200g", isChecked: false },
  { id: 23, section: "Deli", item: "Salami", quantity: "250g", isChecked: false },
  { id: 24, section: "Bakery", item: "Bread", quantity: "1 loaf", isChecked: false },
  { id: 25, section: "Bakery", item: "Bagels", quantity: "6 pieces", isChecked: false },
  { id: 26, section: "Frozen Foods", item: "Frozen Pizza", quantity: "1 box", isChecked: false },
  { id: 27, section: "Frozen Foods", item: "Frozen Vegetables", quantity: "1 kg", isChecked: false },
  { id: 28, section: "Desserts", item: "Ice Cream", quantity: "1 tub", isChecked: false },
  { id: 29, section: "Desserts", item: "Cake Mix", quantity: "1 box", isChecked: false },
  { id: 30, section: "Cleaning Supplies", item: "Dish Soap", quantity: "500ml", isChecked: false },
];


export default function GroceryListMaker() {
  const tableHead = ["Add to list", "Section", "Item", "Quantity", "List"];
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const [filteredData, setFilteredData] = useState(initialData);
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState(initialData.map(() => 1));

  //handle increment
  const handleIncrement = (index) => {
    const updatedQuantities = [...quantities];
    updatedQuantities[index] += 1;
    setQuantities(updatedQuantities);
  };
  
  //handle decrement
  const handleDecrement = (index) => {
    const updatedQuantities = [...quantities];
    if (updatedQuantities[index] > 1) {
      updatedQuantities[index] -= 1;
      setQuantities(updatedQuantities);
    }
  };

 //handle search
 const handleSearch = (query) => {
   setSearchQuery(query);
   if (query) {
     const filteredItems = initialData.filter((item) =>
       Object.values(item).some(
         (value) =>
           typeof value === 'string' &&
           value.toLowerCase().includes(query.toLowerCase())
       )
     );
     setFilteredData(filteredItems);
   } else {
     setFilteredData(initialData);
   }
   setCurrentPage(1);
 };

 //handle next page button click
 const handleNextPage = () => {
   setCurrentPage((prevPage) => prevPage + 1);
 };

 //handle previous page button click
 const handlePreviousPage = () => {
   setCurrentPage((prevPage) => prevPage - 1);
 };

 const startIndex = (currentPage - 1) * itemsPerPage;
 const endIndex = Math.min(currentPage * itemsPerPage, filteredData.length);
 const displayedItems = filteredData.slice(startIndex, endIndex);

 //handle checkbox click
 const handleCheckboxToggle = (itemId) => {
   setFilteredData((prevData) =>
     prevData.map((item) =>
       item.id === itemId
         ? { ...item, isChecked: !item.isChecked }
         : item
     )
   );

   setCart((prevCart) =>
     prevCart.some((item) => item.id === itemId)
       ? prevCart.filter((item) => item.id !== itemId)
       : [...prevCart, { ...filteredData.find((item) => item.id === itemId) }]
   );
 };

 const getUnit = (quantityString) => {
  const unitMatch = quantityString.match(/[a-zA-Z]+$/); // Match letters at the end of the string
  return unitMatch ? unitMatch[0] : ''; // Return the matched unit or an empty string if no match found
};


 return (
   <PaperProvider>
     <Header title="Grocery List Maker" />
     <View style={styles.container}>
     
       <Searchbar
         placeholder="Search"
         onChangeText={handleSearch}
         value={searchQuery}
         style={styles.searchBar}
       />
          
          <Table style={styles.tableContainer}>
            <Row
          data={tableHead}
          style={styles.head}
          textStyle={styles.headText}
          flexArr={[0.3, 0.5, 1, 1, 0.3]}
        />
        {displayedItems.map((item, index) => (
          <Row
            key={index}
            data={[
              <Checkbox
                status={item.isChecked ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxToggle(item.id)}
              />,
        item.section,
        item.item,
        <View style={styles.quantityContainer}>
        <Text>{getUnit(item.quantity)}</Text>
        <View style={styles.quantityInputContainer}>
        <TouchableOpacity
      onPress={() => handleDecrement(index)}
      style={[styles.spinnerButton, styles.alignRight]}
        >
      <Text style={styles.spinnerText}>-</Text>
    </TouchableOpacity>
    <Text style={styles.spinnerValue}>{quantities[index]}</Text>
    <TouchableOpacity
      onPress={() => handleIncrement(index)}
      style={[styles.spinnerButton, styles.alignRight]}
    >
      <Text style={styles.spinnerText}>+</Text>
    </TouchableOpacity>
  </View>
</View>,
        cart.some((cartItem) => cartItem.id === item.id) ? 'Added' : 'Not Added'
      ]}
      textStyle={styles.text}
      style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
      flexArr={[0.3, 0.5, 1, 1, 0.3]}
    />
  ))}
</Table>
      
      <View style={styles.paginationContainer}>
    <Button
      style={styles.paginationButton}
      onPress={handlePreviousPage}
      disabled={currentPage === 1}
      labelStyle={{ color: 'white', fontWeight: 'bold' }}
    >
      Previous page
    </Button>

    <Text style={styles.pageNumber}>
      Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}
    </Text>

    <Button
      style={styles.paginationButton}
      onPress={handleNextPage}
      disabled={endIndex >= filteredData.length}
      labelStyle={{ color: 'white', fontWeight: 'bold' }}
    >
      Next page
    </Button>
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
    width: "100%", // Adjusted to match the width of the searchBar
    alignSelf: "center",
    marginVertical: 16,
  },
  head: {
    height: 50, // Adjusted for better consistency if needed
    backgroundColor: "#f1f8ff",
  },
  headText: {
    margin: 6,
    fontWeight: "bold",
    color: "#8271a5",
    textAlign: "left",
  },
  text: {
    margin: 6,
    textAlign: "left",
    color: "#8271a5",
  },
  rowEven: {
    backgroundColor: "#edf3fc",
  },
  rowOdd: {
    backgroundColor: "#ffffff",
  },
  checkboxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 paginationContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 16,
},
paginationButton: {
  backgroundColor: '#8271a5',
  flex: 2, // Adjust flex value to expand buttons
  marginHorizontal: 7, // Adjust the spacing between buttons if needed
  borderRadius: 0, // Remove rounded corners
  justifyContent: 'center', // Align text content to center
  width: 150,
},
pageNumber: {
  fontWeight: 'bold',
  fontSize: 16,
},

  spinnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerButton: {
    backgroundColor: '#8271a5',
    width: 30,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    marginHorizontal: 5,
  },
  spinnerText: {
    color: 'white',
    fontSize: 18,
  },
  spinnerValue: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  quantityInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  alignRight: {
    marginLeft: 'auto', // This aligns the buttons to the right
  },
});
