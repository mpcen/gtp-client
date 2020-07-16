import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/store';
import { Navigation } from './src/Navigation';

export default () => {
    return (
        <Provider store={store}>
            <Navigation />
        </Provider>
    );
};
