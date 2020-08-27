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
import Loader from '../components/Loader';

const SignUpScreen = ({ navigation, route }) => {
    const [OTP, setOTP] = useState("");
    const [isLoading, setIsLoading] = useState(false); //For Loader Hide/Show
    /**
     * @description Function to Verify OTP.
     * @param null.
     */

    const handleVerifyCode = () => {
        // Request for OTP verification
        const confirmResult = route.params.confirmResult;
        console.log("-------------Confirm result ---------------- ", confirmResult);
        if (OTP.length == 6) {
            setIsLoading(true);
            confirmResult
                .confirm(OTP)
                .then((user) => {
                    console.log("User in OTP screen :--------- ", user);
                    setOTP("");
                    setIsLoading(false);
                    navigation.navigate("ProfileScreen");
                })
                .catch((error) => {
                    setIsLoading(false);
                    console.log("Error while verifying OTP :-- ", error);
                    setOTP("");
                    alert(error.message);
                });
        } else {
            alert("Please enter the code in the sms we sent you.");
        }
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
                    <Title>Verify</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Form>
                    <Item floatingLabel style={{ margin: 20 }}>
                        <Label>OTP</Label>
                        <Input
                            placeholder="Please enter OTP"
                            value={OTP}
                            maxLength={6}
                            keyboardType={'number-pad'}
                            onChangeText={(text) => setOTP(text)}
                        />
                    </Item>

                </Form>

                <Button rounded style={styles.button} onPress={handleVerifyCode}>
                    <Text> Verify </Text>
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
