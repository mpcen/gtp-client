import React from 'react';
import { Provider } from 'react-redux';

import { store } from './src/store';
import { Navigator } from './src/Navigator';

export default () => {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>
    );
};
