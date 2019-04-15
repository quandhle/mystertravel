import React from 'react';
import ApiTest from './api_test';
import '../assets/css/app.scss';
import logo from '../assets/images/logo.svg';

const App = () => (
    <div>
        <div className="app center">
            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
        </div>
        <ApiTest/>
    </div>
);

export default App;
