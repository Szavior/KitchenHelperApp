import * as React from "react";
import { Appbar } from "react-native-paper";

const Header = ({ title }) => (
  <Appbar.Header>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title={title} />
  </Appbar.Header>
);

export default Header;
