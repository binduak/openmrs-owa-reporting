import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-theme.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {Provider} from "react-redux";
import configureStore from "./store/configureStore";
import {ReactTable} from "react-table";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';



const store = configureStore();

ReactDOM.render(<Provider store={store} >
    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
