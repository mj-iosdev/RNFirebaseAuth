# React Native Firebase Authentication

Firebase Authentication with React Native

This is a demo project with use of React Native to Authenticate Firebase User with different methods provided by Firebase.

This project was built using [React Native Firebase](https://rnfirebase.io/).

## How to use

1. To run the project
  
  ```
  npm install
  ```
  
  ```
  npx pod-install
  ```
  
2. Create a Firebase project 
  
  [Firebase](https://console.firebase.google.com/)
  
3. Add config object from Firebase Webapp in to /src/setup/firebase/FirebaseConfig.js
  
  ```
    const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
  };
``` 
## To do

- [x] Add Authentication with Email and Password
- [ ] Add Authentication with Facebook
- [ ] Add Authentication with Google
- [ ] Add Authentication with Phone number
- [ ] Add Authentication with Twitter
