import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import Header from "./components/header";
import {Footer} from "./components/footer";
import {Provider} from "react-redux";
import store from "./store/store";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header/>
      <App />
      <Footer/>

    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);


