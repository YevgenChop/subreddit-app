import React, { Component } from 'react';
import { Provider } from 'react-redux';
import storeConfig from './store';
import App from './components/App';

const store = storeConfig(); // initialization of store

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default Root;
