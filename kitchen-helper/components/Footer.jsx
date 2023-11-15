import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import Dashboard from "../app/(loggedIn)/Dashboard";
import GroceryListMaker from "../app/(loggedIn)/GroceryListMaker";
import Inventory from "../app/(loggedIn)/Inventory";
import RecipeRecommender from "../app/(loggedIn)/RecipeRecommender";

const Footer = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "dashboard",
      title: "Dashboard",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "listMaker",
      title: "List Maker",
      focusedIcon: "view-list",
      unfocusedIcon: "view-list-outline",
    },
    {
      key: "inventory",
      title: "Fridge",
      focusedIcon: "fridge-variant",
      unfocusedIcon: "fridge-variant-outline",
    },
    {
      key: "recipes",
      title: "Recipes",
      focusedIcon: "food",
      unfocusedIcon: "food-outline",
    },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "dashboard":
        return <Dashboard />;
      case "listMaker":
        return <GroceryListMaker />;
      case "inventory":
        return <Inventory />;
      case "recipes":
        return <RecipeRecommender />;
      default:
        return null;
    }
  };

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default Footer;
