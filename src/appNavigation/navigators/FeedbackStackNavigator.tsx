import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { FeedbackScreen } from '../../feedback/FeedbackScreen';
import { Font } from '../../common/fonts/fonts';
import { Color } from '../../common/styles/colors';

const FeedbackStack = createStackNavigator();

export const FeedbackStackNavigator = () => {
    return (
        <FeedbackStack.Navigator>
            <FeedbackStack.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={{
                    headerTitle: 'Feedback',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: Font.BebasNeue_400Regular,
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                }}
            />
        </FeedbackStack.Navigator>
    );
};
