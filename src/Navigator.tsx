import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthHomeScreen } from './auth/AuthHomeScreen';
import { SigninScreen } from './auth/SigninScreen';
import { SignupScreen } from './auth/SignupScreen';
import { ForgotPasswordScreen } from './auth/ForgotPasswordScreen';
import { LeaguesScreen } from './leagues/LeaguesScreen';
import { RootState } from './store/rootReducer';
import { AccountScreen } from './account/AccountScreen';
import { ImportSleeperLeaguesScreen } from './leagues/importLeague/sleeper/ImportSleeperLeaguesScreen';
import { ResolvingAuthScreen } from './auth/ResolvingAuthScreen';
import { PreloadingDataScreen } from './auth/PreloadingDataScreen';
import { GarbageTimeMatchupsScreen } from './garbageTimeMatchups/GarbageTimeMatchupsScreen';
import { FeedbackScreen } from './feedback/FeedbackScreen';

export type LeaguesStackParamList = {
    Leagues: undefined;
    ImportSleeperLeagues: undefined;
    LeagueHome: { leagueId: string };
};

const Tabs = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const LeaguesStack = createStackNavigator<LeaguesStackParamList>();
const GarbageTimeMatchupsStack = createStackNavigator();
const FeedbackStack = createStackNavigator();
const AccountStack = createStackNavigator();

const GarbageTimeMatchupsStackScreen = () => {
    return (
        <GarbageTimeMatchupsStack.Navigator>
            <GarbageTimeMatchupsStack.Screen
                name="GarbageTimeMatchups"
                options={{
                    headerTitle: 'Compare Teams',
                    headerTitleAlign: 'center',
                }}
                component={GarbageTimeMatchupsScreen}
            />
        </GarbageTimeMatchupsStack.Navigator>
    );
};

const LeaguesStackScreen = () => {
    return (
        <LeaguesStack.Navigator>
            <LeaguesStack.Screen
                name="Leagues"
                options={{ headerTitle: 'Leagues', headerTitleAlign: 'center' }}
                component={LeaguesScreen}
            />
            <LeaguesStack.Screen
                name="ImportSleeperLeagues"
                options={{
                    headerTitle: 'Add Sleeper League',
                    headerTitleAlign: 'center',
                }}
                component={ImportSleeperLeaguesScreen}
            />
        </LeaguesStack.Navigator>
    );
};

const FeedbackStackScreen = () => {
    return (
        <FeedbackStack.Navigator>
            <FeedbackStack.Screen
                name="Feedback"
                options={{
                    headerTitle: 'Feedback',
                    headerTitleAlign: 'center',
                }}
                component={FeedbackScreen}
            />
        </FeedbackStack.Navigator>
    );
};

const AccountStackScreen = () => {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen
                name="Account"
                options={{ headerTitle: 'Account', headerTitleAlign: 'center' }}
                component={AccountScreen}
            />
        </AccountStack.Navigator>
    );
};

export const Navigator = () => {
    const { token, isResolvingAuth, isDataPreloaded } = useSelector(
        (state: RootState) => state.auth
    );

    // Checking to see if we have an auth token stored
    if (isResolvingAuth) {
        return (
            <NavigationContainer>
                <ResolvingAuthScreen />
            </NavigationContainer>
        );
    }

    // If we have a token, check to see if data is loaded. If not, fetch it, if so, render the app.
    if (token) {
        if (!isDataPreloaded) {
            return (
                <NavigationContainer>
                    <PreloadingDataScreen />
                </NavigationContainer>
            );
        }

        return (
            <NavigationContainer>
                <Tabs.Navigator
                    tabBarOptions={{
                        showLabel: false,
                        activeTintColor: '#2089dc',
                        inactiveTintColor: '#adadad',
                    }}
                >
                    <Tabs.Screen
                        name="Leagues"
                        component={LeaguesStackScreen}
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

                    <Tabs.Screen
                        name="GarbageTimeMatchups"
                        component={GarbageTimeMatchupsStackScreen}
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

                    <Tabs.Screen
                        name="Feedback"
                        component={FeedbackStackScreen}
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

                    <Tabs.Screen
                        name="Account"
                        component={AccountStackScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome
                                    name="gear"
                                    size={18}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </Tabs.Navigator>
            </NavigationContainer>
        );
    }

    // If no token, render Auth stack
    return (
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen
                    name="AuthHome"
                    component={AuthHomeScreen}
                    options={{ headerShown: false }}
                />
                <AuthStack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ headerShown: false }}
                />
                <AuthStack.Screen
                    name="Signin"
                    component={SigninScreen}
                    options={{ headerShown: false }}
                />
                <AuthStack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ headerShown: false }}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};
