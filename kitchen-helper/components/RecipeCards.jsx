import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const RecipeCards = ({ title, content, uri }) => (
  <Card style={{ marginBottom: 16 }}>
    {" "}
    {/* Add marginBottom directly to Card component */}
    <Card.Title title={title} subtitle="Dinner" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">{title}</Text>
      <Text variant="bodyMedium">{content}</Text>
    </Card.Content>
    <Card.Cover source={{ uri }} />
    <Card.Actions>
      <Button>Cook</Button>
    </Card.Actions>
  </Card>
);

export default RecipeCards;
