import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { AccountScreen } from '../../account/AccountScreen';
import { Font } from '../../common/fonts/fonts';
import { Color } from '../../common/styles/colors';

const AccountStack = createStackNavigator();

export const AccountStackNavigator = () => {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen
                name="Account"
                component={AccountScreen}
                options={{
                    headerTitle: 'Account',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: Font.BebasNeue_400Regular,
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                }}
            />
        </AccountStack.Navigator>
    );
};
