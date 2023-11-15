import { StyleSheet, ScrollView, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import React from "react";
import Header from "../../components/Header";
import RecipeCards from "../../components/RecipeCards";

export default function recipeRecommender() {
  const [text, setText] = React.useState("");
  return (
    <PaperProvider>
      <Header title="Recipes" />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          <RecipeCards
            title="Spaghetti Bolognese"
            content="A classic Italian dish featuring ground meat simmered in a rich tomato sauce, served over al dente spaghetti."
            uri="https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/06/THUMB-LINK-2020-2-1200x675.jpg"
          />
          <RecipeCards
            title="Chicken Caesar Salad"
            content="Crisp romaine lettuce, grilled chicken breast, croutons, and parmesan cheese tossed in creamy Caesar dressing."
            uri="https://live.staticflickr.com/65535/49989397386_eb00d1c314_b.jpg"
          />
          <RecipeCards
            title="Vegetable Stir-Fry"
            content="A colorful medley of fresh vegetables stir-fried to perfection in a savory soy-ginger sauce, served over steamed rice."
            uri="https://www.onceuponachef.com/images/2017/02/Asian-Vegetable-Stir-Fry-3.jpg"
          />
          <RecipeCards
            title="Homemade Margherita Pizza"
            content="A simple and delicious pizza featuring a thin crust topped with tomato sauce, fresh mozzarella, tomatoes, and basil"
            uri="https://images.prismic.io/eataly-us/ed3fcec7-7994-426d-a5e4-a24be5a95afd_pizza-recipe-main.jpg?auto=compress,format"
          />
        </View>
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#d5e3fe",
    padding: 16,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  emailBtn: {
    marginTop: 16,
  },
  lblText: {
    color: "#8271a5",
  },
  smallText: {
    color: "#8271a5",
    marginTop: 16,
  },
});
