import React from "react";
import { Auth } from "../setup/firebase/FirebaseSetup";

/**
 * @description Function to Login with Email/Password.
 * @param email - Email of the user.
 * @param password - Password of the user.
 */

export const signInWithEmail = (email, password) => {
  return new Promise(function(resolve, reject) {
    Auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @description Function to Register with Email/Password.
 * @param email - Email of the user.
 * @param password - Password of the user.
 */

export const signUpWithEmail = (email, password) => {
  return new Promise(function(resolve, reject) {
    Auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @description Function to Signout user.
 * @param null.
 */

export const signOutUser = () => {
  return new Promise(function(resolve, reject) {
    Auth()
      .signOut()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
