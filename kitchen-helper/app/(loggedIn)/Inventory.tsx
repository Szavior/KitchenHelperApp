import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {
  PaperProvider,
  Provider,
  List,
  Searchbar,
  IconButton,
  TouchableRipple,
  FAB,
  Portal,
  useTheme
} from "react-native-paper";
import { Link } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, database } from "../../firebaseConfig";
import Header from "../../components/Header";

interface Ingredient {
  id: number;
  name: string;
  count: number;
}

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    async function fetchData() {
      const temp = await getIngredients("CSoCdtJx3CA3XvzN0b5V");
      if (temp) {
        setIngredients(temp);
      }
    }

    fetchData();
  }, []); // Run the effect only once, when the component mounts

  const fabOpen = false;

  async function getIngredients(householdId: string): Promise<Ingredient[] | undefined> {
    const householdRef = doc(database, "households", householdId);

    const householdSnap = await getDoc(householdRef);

    if (householdSnap.exists()) {
      const arrayFromFirebase = householdSnap.data().inventory;

      let i = 1;
      let firebaseIngredients: Ingredient[] = [];

      for (const key in arrayFromFirebase) {
        if (arrayFromFirebase.hasOwnProperty(key)) {
          console.log(`${key}: ${key.valueOf()}`);
          firebaseIngredients.push({
            id: i,
            name: key,
            count: parseInt(arrayFromFirebase[key].valueOf()),
          });
          i++;
        }
      }

      return firebaseIngredients;
    } else {
      console.log("No such document!");
      return undefined; // Return undefined in case the document doesn't exist
    }
  }

  async function saveIngredients(householdId: string) {
    const ingredientsObject: { [key: string]: number } = ingredients.reduce(
      (acc, curr) => {
        acc[curr.name] = curr.count;
        return acc;
      },
      {} as { [key: string]: number } // Add this type assertion
    );
  
    // Add a new document in the "households" collection
    await setDoc(doc(database, "households", householdId), {
      inventory: ingredientsObject,
    });
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement your search logic here
    // Update the ingredients list based on the search query
  };

  const handlePlusClick = (item: Ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === item.id ? { ...ingredient, count: item.count + 1 } : ingredient
      )
    );
  };

  const handleMinusClick = (item: Ingredient) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient) =>
        ingredient.id === item.id ? { ...ingredient, count: item.count - 1 } : ingredient
      )
    );
  };

  return (
    <Provider theme={useTheme()}>
      <Header title="Manage Inventory" />
      <View style={styles.main}>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => handleSearch(query)}
          value={searchQuery}
          style={styles.searchBar}
        />
        <ScrollView style={styles.list}>
          {ingredients.map((item) => (
            <TouchableRipple key={item.id}>
              <List.Item
                title={`${item.name} | ${item.count}`}
                right={(props) => (
                  <View style={styles.buttonContainer}>
                    <IconButton
                      {...props}
                      icon="plus"
                      style={styles.plus}
                      mode="contained"
                      size={24}
                      onPress={() => handlePlusClick(item)}
                    />
                    <IconButton
                      {...props}
                      icon="minus"
                      style={styles.minus}
                      mode="contained"
                      size={24}
                      onPress={() => handleMinusClick(item)}
                    />
                  </View>
                )}
              />
            </TouchableRipple>
          ))}
        </ScrollView>
        <Portal>
          <FAB.Group
            open={fabOpen}
            icon={'content-save'}
            actions={[
              { icon: 'plus', onPress: () => {} },
              { icon: 'star', label: 'Star', onPress: () => {} },
              { icon: 'email', label: 'Email', onPress: () => {} },
            ]}
            onStateChange={() => saveIngredients("CSoCdtJx3CA3XvzN0b5V")}
            onPress={() => {}}
            visible={true}
          />
        </Portal>
      </View>
    </Provider>
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
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  plus: {
    backgroundColor: "green",
  },
  minus: {
    backgroundColor: "red",
  },
  fab: {
    margin: 8,
  },
});