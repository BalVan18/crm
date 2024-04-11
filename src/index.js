import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { store } from './store/store.js'
import { Provider } from 'react-redux'

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCEK0NVdp4WzSsQafh0OCByPklWxUOaLdE",
  authDomain: "autocrm-demo.firebaseapp.com",
  projectId: "autocrm-demo",
  storageBucket: "autocrm-demo.appspot.com",
  messagingSenderId: "1021990686068",
  appId: "1:1021990686068:web:594b338eb2d28be56e3021",
  measurementId: "G-E768XQ21SG",
  databaseURL: "https://autocrm-demo-default-rtdb.europe-west1.firebasedatabase.app/",
};

// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
