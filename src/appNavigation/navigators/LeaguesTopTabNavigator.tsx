import React, { useEffect } from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Font } from '../../common/fonts/fonts';
import { Color } from '../../common/styles/colors';
import { LeaguesScreen } from '../../leagues/LeaguesScreen';
import { LeagueTab } from '../../leagues/components/LeagueTab';
import { LeaguePlatform } from '../../leagues/types';
import { useNavigationState } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SelectedLeagueTab } from '../store/storeTypes';
import { setSelectedLeagueTab } from '../store/actionCreators';

const LeaguesTopTab = createMaterialTopTabNavigator();

export const LeaguesTopTabNavigator = () => {
    const { routes } = useNavigationState((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (routes[0].state?.index === 0) {
            dispatch(setSelectedLeagueTab(SelectedLeagueTab.Sleeper));
        } else if (routes[0].state?.index === 1) {
            dispatch(setSelectedLeagueTab(SelectedLeagueTab.ESPN));
        }
    }, [routes[0].state?.index]);

    return (
        <LeaguesTopTab.Navigator
            tabBarOptions={{
                labelStyle: {
                    fontSize: 18,
                    fontFamily: Font.BebasNeue_400Regular,
                },
                indicatorStyle: { backgroundColor: Color.MainBlack },
            }}
        >
            <LeaguesTopTab.Screen
                name="SleeperTab"
                component={LeaguesScreen}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <LeagueTab
                            focused={focused}
                            platform={LeaguePlatform.Sleeper}
                        />
                    ),
                }}
            />
            <LeaguesTopTab.Screen
                name="ESPNTab"
                component={LeaguesScreen}
                options={{
                    tabBarLabel: ({ focused }) => (
                        <LeagueTab
                            focused={focused}
                            platform={LeaguePlatform.ESPN}
                        />
                    ),
                }}
            />
        </LeaguesTopTab.Navigator>
    );
};
