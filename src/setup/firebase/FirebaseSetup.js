import React from "react";
import App from "../../../App";
import firebase from "@react-native-firebase/app";
import Auth from "@react-native-firebase/auth";
import { FirebaseConfig } from "./FirebaseConfig";

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseConfig);
}

export { firebase, Auth };

const FirebaseSetup = () => {
  return <App />;
};

export default FirebaseSetup;
