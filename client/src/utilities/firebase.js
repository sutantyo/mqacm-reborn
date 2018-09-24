import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAj7DYUjvN2pLCUmxY-O7dns92kMrOZIyo",
  authDomain: "mqacm-reborn.firebaseapp.com",
  databaseURL: "https://mqacm-reborn.firebaseio.com",
  projectId: "mqacm-reborn",
  storageBucket: "mqacm-reborn.appspot.com",
  messagingSenderId: "857133548781"
};

if (!firebase.apps.length){
  firebase.initializeApp(config);
}
const auth = firebase.auth();

export {
  auth,
  firebase,
};
