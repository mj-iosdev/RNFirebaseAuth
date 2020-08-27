import React, { useEffect, useState } from "react";
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
} from "native-base";
import { StyleSheet, Image, View, Alert, Platform } from "react-native";
import { signInWithFacebook, signInWithGmail, signInWithApple } from "../service/FireAuthHelper";
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import appleAuth, { AppleAuthRequestScope, AppleAuthRequestOperation, } from '@invertase/react-native-apple-authentication';
import Loader from '../components/Loader';

const LoginLanding = ({ navigation }) => {

    const [isLoading, setIsLoading] = useState(false); //For Loader Hide/Show

    /**
    * @description Function to Login with Facebook.
    * @param null.
    */
    const loginWithFacebook = async () => {
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
        setIsLoading(true);
        if (result.isCancelled) {
            setIsLoading(false);
            throw 'User cancelled the login process';
        } else {
            const data = await AccessToken.getCurrentAccessToken();
            if (!data) {
                setIsLoading(false);
                throw 'Something went wrong obtaining access token';
            } else {
                signInWithFacebook(data.accessToken)
                    .then((res) => {
                        console.log("Response of facebook ", JSON.stringify(res));
                        alert("User logged in Successfully");
                        navigation.navigate("ProfileScreen");
                    })
                    .catch(error => {
                        if (error.code == 'auth/account-exists-with-different-credential') {
                            Alert.alert(
                                'Authentication Failed',
                                'Sorry! An account already exists with the same email address but different sign-in credentials.',
                                [{
                                    text: "OK",
                                    onPress: () => setIsLoading(false)
                                }]
                            );
                        } else {
                            console.log("Error while signin using facebook from FB API ", error.code);
                            setIsLoading(false);
                        }

                    })
            }
        }
    }

    /**
     * @description Function to Configure google sign .
     * @param null.
     */
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '954003985339-3br7203kdhn6up8pdfss5da7ou0d0bn4.apps.googleusercontent.com', //'954003985339-qsic3rv7bduob5a744mh364vvtmq7f7a.apps.googleusercontent.com',
            offlineAccess: false,
        });
    }, [])

    /**
     * @description Function to Login with Gmail.
     * @param null.
     */
    const loginWithGmail = async () => {
        try {
            setIsLoading(true);
            await GoogleSignin.hasPlayServices();
            const userInfoFromGmail = await GoogleSignin.signIn();
            console.log("Successfully Login with :===> " + JSON.stringify(userInfoFromGmail))
            console.log("user token :--> " + JSON.stringify(userInfoFromGmail.idToken));
            // console.log('User information :--> ' + JSON.stringify(userInfo.user))

            signInWithGmail(userInfoFromGmail.idToken)
                .then((res) => {
                    console.log("Response of Gmail ", JSON.stringify(res));
                    let userInfo = {
                        firstName: res.user.displayName.split(' ')[0],
                        lastName: res.user.displayName.split(' ')[1],
                        userAuth: {
                            email: res.user.email,
                            password: "",
                        },
                        phoneNumber: "",
                    }
                    console.log("User info gmail---------", JSON.stringify(userInfo));
                    alert("User logged in Successfully");
                    setIsLoading(false);
                    navigation.navigate("ProfileScreen");
                })
                .catch(error => {
                    console.log("Error while signin using facebook from Gmail API ", error);
                    setIsLoading(false);
                })
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                setIsLoading(false);
                Alert.alert('cancelled', 'You cancelled Gmail sign in.');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                setIsLoading(false);
                Alert.alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                setIsLoading(false);
                Alert.alert('play services not available or outdated');
            } else {
                console.log("Something went wrong :===> " + error.toString())
                setIsLoading(false);
                //Alert.alert('Something went wrong', error.toString());
            }
        }
    }

    /**
     * @description Function to Login with Apple ID.
     * @param null.
     */
    const loginWithApple = async () => {
        try {
            const appleAuthRequestResponse = await appleAuth.performRequest({
                requestedOperation: AppleAuthRequestOperation.LOGIN,
                requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
            });

            console.log("Apple Auth request response ---------- ", appleAuthRequestResponse);
            setIsLoading(true);

            const { identityToken, nonce } = appleAuthRequestResponse;
            if (identityToken) {
                signInWithApple(identityToken, nonce)
                    .then((res) => {
                        console.log("Response of Apple ", JSON.stringify(res));
                        setIsLoading(false);
                        let userInfo = {
                            firstName: appleAuthRequestResponse.fullName.givenName,
                            lastName: appleAuthRequestResponse.fullName.familyName,
                            userAuth: {
                                email: appleAuthRequestResponse.email,
                                password: "",
                            },
                            phoneNumber: "",
                        }
                        console.log("User info Apple which stored in firestore while user logged in 1st time ---------", JSON.stringify(userInfo));
                        const collection = 'users/clients';
                    })
                    .catch(error => {
                        console.log("Error while signin using Apple from Apple API ", error);
                        setIsLoading(false);
                    })
            } else {
                setIsLoading(false);
                throw 'Apple Sign-In failed - no identify token returned';
            }
        } catch (error) {
            console.log("Error while signup with apple :--------- ", error);
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Header>
                <Left />
                <Body>
                    <Title>Welcome</Title>
                </Body>
                <Right />
            </Header>
            <Content>
                <Button
                    style={[styles.button, { marginTop: '8%' }]}
                    onPress={() => navigation.navigate("LoginScreen")}>
                    <Image
                        style={styles.btnIcon}
                        source={require('../assets/email.png')}
                    />
                    <Text style={styles.btnText}>Login using Email/Password</Text>
                </Button>

                <Button
                    style={styles.button}
                    onPress={() => navigation.navigate("LoginWithPhone")}
                >
                    <Image
                        style={styles.btnIcon}
                        source={require('../assets/phone.png')}
                    />
                    <Text style={styles.btnText}>Login using Phone Number</Text>
                </Button>

                <Button
                    style={styles.button}
                    onPress={loginWithFacebook}
                >
                    <Image
                        style={styles.btnIcon}
                        source={require('../assets/fbLogo.png')}
                    />
                    <Text style={styles.btnText}>Login using Facebook</Text>
                </Button>

                <Button
                    style={styles.button}
                    onPress={loginWithGmail}
                >
                    <Image
                        style={styles.btnIcon}
                        source={require('../assets/gmailLogo.png')}
                    />
                    <Text style={styles.btnText}>Login using Gmail</Text>
                </Button>

                {Platform.OS == 'ios' && <Button
                    style={styles.button}
                    onPress={loginWithApple}
                >
                    <Image
                        style={styles.btnIcon}
                        source={require('../assets/appleLogo.png')}
                    />
                    <Text style={styles.btnText}>Login using Apple</Text>
                </Button>}

                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: '15%' }}>
                    <Text
                    >Don't have an account?</Text>
                    <Text
                        style={styles.register}
                        onPress={() => navigation.navigate("SignUpScreen")}>  Register </Text>
                </View>
            </Content>
            <Loader isAnimate={isLoading} />
        </Container>
    );
};

export default LoginLanding;

const styles = StyleSheet.create({
    button: {
        justifyContent: "space-between",
        width: '75%',
        alignSelf: "center",
        marginBottom: 20,
        backgroundColor: 'white',
        paddingHorizontal: '4%',
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.2)',
        flexDirection: 'row'
    },
    btnIcon: {
        height: 24, width: 24,
        resizeMode: 'contain'
    },
    btnText: {
        color: 'black',
        width: '90%',
        textAlign: 'left',
        fontSize: 16
    },
    register: {
        textDecorationLine: 'underline'
    }
});
