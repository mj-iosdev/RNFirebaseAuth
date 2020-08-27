import React, { useState } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Label,
  Input,
  Form,
  Item,
  Button,
  Text,
  Icon,
} from "native-base";
import { StyleSheet, Alert } from "react-native";
import { signUpWithEmail } from "../service/FireAuthHelper";
import Loader from '../components/Loader';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); //For Loader Hide/Show

  /**
   * @description Function to Register with Email/Password.
   * @param null.
   */

  const registerWithEmail = () => {
    setIsLoading(true)
    signUpWithEmail(email, password)
      .then((user) => {
        console.log(user);
        alert("User registerd Successfully");
        setEmail("");
        setPassword("");
        setIsLoading(false)
      })
      .catch((error) => {
        console.log("Error while registering phone number :-- ", error);
        Alert.alert(
          'Error',
          'Something went wrong!',
          [{
            text: "OK",
            onPress: () => setIsLoading(false)
          }]
        );
      });
  };

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
              secureTextEntry
            />
          </Item>
        </Form>

        <Button rounded style={styles.button} onPress={registerWithEmail}>
          <Text> Register </Text>
        </Button>
      </Content>
      <Loader isAnimate={isLoading} />
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
