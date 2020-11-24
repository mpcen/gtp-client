import React, { useState } from 'react';
import {
    View,
    Text,
    Keyboard,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, ListItem, Overlay } from 'react-native-elements';

import { RootState } from '../../../store/rootReducer';
import { findESPNLeague, addESPNLeague } from '../../store/actionCreators';

import { RemoveLeagueOverlay } from '../../components/RemoveLeagueOverlay';
import { Color } from '../../../common/styles/colors';
import { Font } from '../../../common/fonts/fonts';
import { OverlayTypes } from '../../../garbageTimeMatchups/types';
import { ESPNLeagueInfoListItem } from '../../components/espn/ESPNLeagueInfoListItem';
import { LeaguePlatform } from '../../types';
import { ESPNLeagueExternal } from '../../store/storeTypes';

export const ImportESPNLeaguesScreen = () => {
    // state
    const [leagueId, setLeagueId] = useState('');
    const [seasonId, setSeasonId] = useState('');
    const [selectedLeague, setSelectedLeague] = useState(
        {} as ESPNLeagueExternal
    );
    const [overlay, setOverlay] = useState(OverlayTypes.None);

    // store
    const dispatch = useDispatch();
    const { isLoading, error, espnLeagueExternal } = useSelector(
        (state: RootState) => state.leagues
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.dismissableContainer}>
                    <View style={styles.searchContainer}>
                        {/* LEAGUE ID */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter ESPN League ID"
                            value={leagueId}
                            keyboardType="number-pad"
                            onChangeText={setLeagueId}
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                                if (leagueId) {
                                    dispatch(
                                        findESPNLeague(leagueId, seasonId)
                                    );
                                }
                            }}
                        />

                        {/* SEASON */}
                        <TouchableOpacity
                            style={styles.seasonDropdownContainer}
                            onPress={() => {
                                setOverlay(OverlayTypes.YearSelect);
                                Keyboard.dismiss();
                            }}
                        >
                            <Text style={styles.seasonText}>
                                {seasonId ? seasonId : 'Season'}
                            </Text>

                            <Icon name="menu-down" type="material-community" />
                        </TouchableOpacity>

                        {/* CLEAR LEAGUE ID BUTTON */}
                        {leagueId && !isLoading ? (
                            <Button
                                iconContainerStyle={
                                    styles.clearButtonIconContainer
                                }
                                style={styles.clearButtonStyle}
                                containerStyle={[
                                    styles.clearButtonContainer,
                                    seasonId
                                        ? styles.clearButtonContainerSearchable
                                        : null,
                                ]}
                                type="clear"
                                icon={{
                                    name: 'close',
                                    type: 'material-community',
                                    size: 12,
                                    color: Color.PureWhite,
                                }}
                                onPress={() => setLeagueId('')}
                            />
                        ) : null}

                        {/* SEARCH BUTTON */}
                        {leagueId && seasonId && !isLoading ? (
                            <Button
                                containerStyle={styles.searchButtonContainer}
                                buttonStyle={styles.searchButtonStyle}
                                title="Search"
                                onPress={() => {
                                    Keyboard.dismiss();
                                    dispatch(
                                        findESPNLeague(leagueId, seasonId)
                                    );
                                }}
                            />
                        ) : null}
                    </View>

                    {/* ERROR TEXT */}
                    {error ? (
                        <View style={styles.errorTextContainer}>
                            <Text testID="text-error" style={styles.errorText}>
                                {error}
                            </Text>
                        </View>
                    ) : null}

                    {/* LEAGUE LIST ITEM */}
                    {espnLeagueExternal?.id && (
                        <ESPNLeagueInfoListItem
                            leagueName={espnLeagueExternal.settings.name}
                            seasonId={espnLeagueExternal.seasonId.toString()}
                            totalTeams={espnLeagueExternal.teams.length}
                            isLoading={isLoading}
                            itemAdded={espnLeagueExternal.added}
                            onButtonPressCallback={() => {
                                if (espnLeagueExternal.added) {
                                    setOverlay(OverlayTypes.RemoveLeague);
                                    setSelectedLeague(espnLeagueExternal);
                                } else {
                                    dispatch(
                                        addESPNLeague(
                                            espnLeagueExternal.id.toString(),
                                            espnLeagueExternal.seasonId.toString()
                                        )
                                    );
                                }
                            }}
                        />
                    )}
                </View>
            </TouchableWithoutFeedback>

            {/* OVERLAYS */}
            {overlay === OverlayTypes.RemoveLeague && (
                <RemoveLeagueOverlay
                    leaguePlatform={LeaguePlatform.ESPN}
                    league={{
                        leagueId: selectedLeague.id.toString(),
                        seasonId: selectedLeague.seasonId.toString(),
                        leagueName: selectedLeague.settings.name,
                    }}
                    isOverlayVisible={overlay === OverlayTypes.RemoveLeague}
                    closeOverlay={() => setOverlay(OverlayTypes.None)}
                />
            )}

            {overlay === OverlayTypes.YearSelect && (
                <Overlay
                    overlayStyle={styles.seasonOverlay}
                    isVisible={overlay === OverlayTypes.YearSelect}
                    onBackdropPress={() => setOverlay(OverlayTypes.None)}
                >
                    <FlatList
                        data={new Array(17)
                            .fill('')
                            .map((_, i) => (2004 + i).toString())
                            .reverse()}
                        keyExtractor={(item) => item}
                        renderItem={({ item }: { item: string }) => (
                            <ListItem
                                key={item}
                                bottomDivider
                                onPress={() => {
                                    setSeasonId(item);
                                    setOverlay(OverlayTypes.None);
                                }}
                            >
                                <ListItem.Title
                                    style={styles.seasonListItemTitle}
                                >
                                    {item}
                                </ListItem.Title>
                            </ListItem>
                        )}
                    />
                </Overlay>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        position: 'relative',
        backgroundColor: 'white',
        height: 64,
        alignItems: 'center',
        marginLeft: 12,
        marginRight: 12,
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingLeft: 20,
        backgroundColor: Color.SuperLightGray,
        borderRadius: 50,
        fontFamily: 'BebasNeue_400Regular',
    },
    clearButtonIconContainer: {
        borderRadius: 10,
        backgroundColor: Color.CancelGray,
        padding: 3,
    },
    clearButtonStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    clearButtonContainer: {
        position: 'absolute',
        right: 106,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    clearButtonContainerSearchable: {
        right: 208,
    },
    errorTextContainer: {
        alignItems: 'center',
    },
    errorText: { color: 'red' },
    seasonDropdownContainer: {
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 90,
        marginLeft: 16,
    },
    seasonText: {
        fontFamily: Font.BebasNeue_400Regular,
        fontSize: 20,
    },
    seasonListItemTitle: {
        fontSize: 20,
        textAlign: 'center',
        width: '100%',
        fontFamily: Font.BebasNeue_400Regular,
    },
    seasonOverlay: {
        width: 200,
        height: 400,
        justifyContent: 'center',
    },
    dismissableContainer: { flex: 1 },
    searchButtonContainer: { width: 86, marginLeft: 16 },
    searchButtonStyle: {
        backgroundColor: Color.ActiveBlue,
        height: 40,
    },
});
