import React, { useState } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  List,
  ListItem,
  Label,
  Input,
  Form,
  Item,
  Button,
  Text,
  Icon,
} from "native-base";
import { StyleSheet } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Register</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel style={{ margin: 20 }}>
            <Label>Email</Label>
            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item floatingLabel style={{ margin: 20 }}>
            <Label>Password</Label>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </Item>
        </Form>

        <Button rounded style={styles.button}>
          <Text> Register </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});
