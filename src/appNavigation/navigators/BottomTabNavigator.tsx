import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Color } from '../../common/styles/colors';
import { FeedbackStackNavigator } from './FeedbackStackNavigator';
import { GarbageTimeMatchupsStackNavigator } from './GarbageTimeMatchupsStackNavigator';
import { AccountStackNavigator } from './AccountStackNavigator';
import { LeaguesStackNavigator } from './LeaguesStackNavigator';

const BottomTab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
    return (
        <NavigationContainer>
            <BottomTab.Navigator
                tabBarOptions={{
                    showLabel: false,
                    activeTintColor: Color.MainBlack,
                    inactiveTintColor: Color.InactiveGray,
                }}
            >
                <BottomTab.Screen
                    name="Leagues"
                    component={LeaguesStackNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="football-helmet"
                                size={20}
                                color={color}
                            />
                        ),
                    }}
                />

                <BottomTab.Screen
                    name="GarbageTimeMatchups"
                    component={GarbageTimeMatchupsStackNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="account-switch"
                                size={19}
                                color={color}
                            />
                        ),
                    }}
                />

                <BottomTab.Screen
                    name="Feedback"
                    component={FeedbackStackNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name="message-alert"
                                size={19}
                                color={color}
                            />
                        ),
                    }}
                />

                <BottomTab.Screen
                    name="Account"
                    component={AccountStackNavigator}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <FontAwesome name="gear" size={18} color={color} />
                        ),
                    }}
                />
            </BottomTab.Navigator>
        </NavigationContainer>
    );
};
