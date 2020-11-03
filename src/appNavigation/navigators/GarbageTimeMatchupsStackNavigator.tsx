import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { GarbageTimeMatchupsScreen } from '../../garbageTimeMatchups/GarbageTimeMatchupsScreen';
import { Font } from '../../common/fonts/fonts';
import { Color } from '../../common/styles/colors';

const GarbageTimeMatchupsStack = createStackNavigator();

export const GarbageTimeMatchupsStackNavigator = () => {
    return (
        <GarbageTimeMatchupsStack.Navigator>
            <GarbageTimeMatchupsStack.Screen
                name="GarbageTimeMatchups"
                component={GarbageTimeMatchupsScreen}
                options={{
                    headerTitle: 'Compare Teams',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: Font.BebasNeue_400Regular,
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                }}
            />
        </GarbageTimeMatchupsStack.Navigator>
    );
};
