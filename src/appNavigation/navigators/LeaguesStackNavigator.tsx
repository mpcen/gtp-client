import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Font } from '../../common/fonts/fonts';
import { Color } from '../../common/styles/colors';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { SelectedLeagueTab } from '../store/storeTypes';
import { ImportESPNLeaguesScreen } from '../../leagues/importLeague/espn/ImportESPNLeaguesScreen';
import { ImportSleeperLeaguesScreen } from '../../leagues/importLeague/sleeper/ImportSleeperLeaguesScreen';
import { LeaguesTopTabNavigator } from './LeaguesTopTabNavigator';

const LeaguesStack = createStackNavigator();

export const LeaguesStackNavigator = () => {
    const { navigate } = useNavigation();
    const { selectedLeagueTab } = useSelector(
        (state: RootState) => state.appNavigation
    );

    return (
        <LeaguesStack.Navigator>
            <LeaguesStack.Screen
                name="Leagues"
                component={LeaguesTopTabNavigator}
                options={{
                    headerTitle: 'Leagues',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: Font.BebasNeue_400Regular,
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                    headerRight: () => (
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderRadius: 5,
                                marginRight: 16,
                                padding: 2,
                            }}
                            onPress={() =>
                                selectedLeagueTab === SelectedLeagueTab.Sleeper
                                    ? navigate('ImportSleeperLeagues')
                                    : navigate('ImportESPNLeagues')
                            }
                        >
                            <Icon name="add" />
                        </TouchableOpacity>
                    ),
                }}
            />

            <LeaguesStack.Screen
                name="ImportESPNLeagues"
                component={ImportESPNLeaguesScreen}
                options={{
                    headerTitle: 'Add ESPN League',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: Font.BebasNeue_400Regular,
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                    headerBackTitleVisible: true,
                    headerBackImage: ({ tintColor }) => (
                        <Icon name="chevron-left" size={40} />
                    ),
                }}
            />

            <LeaguesStack.Screen
                name="ImportSleeperLeagues"
                component={ImportSleeperLeaguesScreen}
                options={{
                    headerTitle: 'Add Sleeper League',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: Font.BebasNeue_400Regular,
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                    headerBackTitleVisible: true,
                    headerBackImage: ({ tintColor }) => (
                        <Icon name="chevron-left" size={40} />
                    ),
                }}
            />
        </LeaguesStack.Navigator>
    );
};
