import React, { useState, useEffect } from "react";
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Content,
    Button,
    Text,
    Icon
} from "native-base";
import { StyleSheet, View, Alert } from "react-native";
import { signInWithPhoneNumber } from "../service/FireAuthHelper";
import PhoneNoInput from '../components/PhoneNoInput';
import Loader from '../components/Loader';

const LoginWithPhone = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [clearInput, setClearInput] = useState(false);

    const [isLoading, setIsLoading] = useState(false); //For Loader Hide/Show

    useEffect(() => {
        setClearInput(false);
    }, []);

    /**
    * @description Function to Validate Phone Number.
    * @param null.
    */
    const validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
        console.log("test mob ------------------- ", phoneNumber);
        return regexp.test(phoneNumber);
    };

    /**
    * @description Function to Login with Phone Number.
    * @param null.
    */
    const handleSendCode = async () => {
        try {
            // Request to send OTP
            if (validatePhoneNumber) {
                setIsLoading(true);
                signInWithPhoneNumber(phoneNumber)
                    .then((result) => {
                        setClearInput(true);
                        setIsLoading(false);
                        navigation.navigate("PhoneOTP", {
                            confirmResult: result,
                            phoneNumber: phoneNumber,
                        });
                    })
                    .catch((error) => {
                        setIsLoading(false);
                        alert(error.message);
                    });
            } else {
                alert("Invalid Phone Number");
            }
        } catch (error) {
            console.log("Erorrrrrr    -------------- ", error);
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
                    <Title>Login</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <View style={{ marginTop: '10%', width: '80%', alignSelf: 'center' }}>
                    <PhoneNoInput
                        getInputvalue={(value) => setPhoneNumber(value)}
                        inputValueClean={clearInput}
                    />
                </View>

                <Button rounded style={styles.button} onPress={handleSendCode}>
                    <Text> Send OTP </Text>
                </Button>
            </Content>
            <Loader isAnimate={isLoading} />
        </Container>
    );
};

export default LoginWithPhone;

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        width: 200,
        alignSelf: "center",
        marginBottom: 20,
        marginTop: '10%'
    },
});
