import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Divider, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';

import * as Constants from '../constants';
import { SleeperLeague } from '../store/storeTypes';

import { LeagueInfoListItem } from './LeagueInfoListItem';
import { Color } from '../../common/styles/colors';

type Props = {
    leagues: SleeperLeague[];
    isLoading: boolean;
    setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedLeague: React.Dispatch<React.SetStateAction<SleeperLeague>>;
};

export const LeagueModule = ({
    leagues,
    isLoading,
    setIsOverlayVisible,
    setSelectedLeague,
}: Props) => {
    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            {/* <View style={styles.headerContainer}>
                <Image
                    style={[
                        styles.leaguePlatformImageStyle,
                        styles.sleeperImageStyle,
                    ]}
                    source={{ uri: sleeperLogoUri }}
                />
                <Button
                    buttonStyle={styles.button}
                    titleStyle={styles.addLeagueButtonTitle}
                    type="outline"
                    title="Add League"
                    onPress={() => navigate('ImportSleeperLeagues')}
                />
            </View> */}

            <FlatList
                contentContainerStyle={
                    leagues.length ? null : styles.emptyLeaguesContainer
                }
                data={leagues}
                keyExtractor={(item) => item.leagueId}
                renderItem={({ item }) => (
                    <LeagueInfoListItem
                        leagueName={item.leagueName}
                        seasonId={item.seasonId}
                        totalTeams={item.teams.length}
                        itemAdded={true}
                        icon="minus-circle"
                        leagueAvatar={item.avatar}
                        onButtonPressCallback={() => {
                            setSelectedLeague(item);
                            setIsOverlayVisible(true);
                        }}
                    />
                )}
                ListEmptyComponent={() =>
                    isLoading ? (
                        <View style={styles.emptyLeaguesContainer}>
                            <Text>{Constants.LoadingText}</Text>
                        </View>
                    ) : (
                        <View style={styles.emptyLeaguesContainer}>
                            <Text style={styles.emptyLeaguesText}>
                                {Constants.AddLeagueText}
                            </Text>
                        </View>
                    )
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        position: 'relative',
    },
    emptyLeaguesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyLeaguesText: {
        fontSize: 18,
        color: Color.MainBlack,
        fontFamily: 'BebasNeue_400Regular',
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 10,
        backgroundColor: Color.SleeperBackgroundColor,
    },
    button: {
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 3,
        paddingBottom: 3,
        borderWidth: 1,
        borderColor: Color.PureWhite,
    },
    leaguePlatformImageStyle: {
        width: 150,
        borderRadius: 50,
    },
    sleeperImageStyle: {
        height: 50,
    },
    addLeagueButtonTitle: {
        color: Color.PureWhite,
        fontFamily: 'BebasNeue_400Regular',
    },
});
