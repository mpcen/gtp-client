import React, { useState } from 'react';
import {
    View,
    Text,
    Keyboard,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
    TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-elements';

import { RootState } from '../../../store/rootReducer';
import { ImportedSleeperLeague } from '../../store/storeTypes';
import {
    findSleeperLeaguesForUser,
    addSleeperLeague,
    removeSleeperLeague,
} from '../../store/actionCreators';

import { RemoveLeagueOverlay } from '../../components/RemoveLeagueOverlay';
import { LeagueInfoListItem } from '../../components/LeagueInfoListItem';
import { Color } from '../../../common/styles/colors';
import { LeaguePlatform } from '../../types';

export const ImportSleeperLeaguesScreen = () => {
    // state
    const [username, setUsername] = useState('');
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState(
        {} as ImportedSleeperLeague
    );

    // store
    const dispatch = useDispatch();
    const { importSleeperLeagues, isLoading, error } = useSelector(
        (state: RootState) => state.leagues
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.dismissableContainer}>
                    <View style={styles.searchContainer}>
                        {/* USERNAME */}
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter Sleeper username"
                            value={username}
                            onChangeText={setUsername}
                        />

                        {/* CLEAR TEXT BUTTON */}
                        {username && !isLoading ? (
                            <Button
                                style={styles.clearButtonStyle}
                                containerStyle={styles.clearButtonContainer}
                                iconContainerStyle={
                                    styles.closeButtonIconContainer
                                }
                                type="clear"
                                icon={{
                                    name: 'close',
                                    type: 'material-community',
                                    size: 12,
                                    color: Color.PureWhite,
                                }}
                                onPress={() => setUsername('')}
                            />
                        ) : null}

                        {/* SEARCH BUTTON */}
                        {username && !isLoading ? (
                            <Button
                                containerStyle={styles.searchButtonContainer}
                                buttonStyle={styles.searchButtonStyle}
                                title="Search"
                                onPress={() => {
                                    Keyboard.dismiss();
                                    dispatch(
                                        findSleeperLeaguesForUser(username)
                                    );
                                }}
                            />
                        ) : null}

                        {/* LOADING BUTTON */}
                        {username && isLoading ? (
                            <Button
                                loading
                                containerStyle={styles.searchButtonContainer}
                                buttonStyle={{
                                    backgroundColor: Color.ActiveBlue,
                                    height: 40,
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

                    {/* LEAGUE LIST */}
                    <FlatList
                        data={importSleeperLeagues.leagues}
                        keyExtractor={({ leagueId }) => leagueId}
                        renderItem={({
                            item,
                        }: {
                            item: ImportedSleeperLeague;
                        }) => (
                            <LeagueInfoListItem
                                leagueName={item.name}
                                seasonId={item.seasonId}
                                leaguePlatform={LeaguePlatform.Sleeper}
                                totalTeams={item.totalTeams}
                                itemAdded={item.added}
                                icon={
                                    item.added ? 'minus-circle' : 'plus-circle'
                                }
                                sleeperLeagueAvatar={item.avatar || ''}
                                isLoading={isLoading}
                                onButtonPressCallback={() => {
                                    if (item.added) {
                                        setIsOverlayVisible(true);
                                        setSelectedLeague(item);
                                    } else {
                                        dispatch(
                                            addSleeperLeague(item.leagueId)
                                        );
                                    }
                                }}
                            />
                        )}
                    />
                </View>
            </TouchableWithoutFeedback>

            {/* OVERLAY */}
            <RemoveLeagueOverlay
                selectedLeague={{
                    leagueId: selectedLeague.leagueId,
                    leagueName: selectedLeague.name,
                }}
                isOverlayVisible={isOverlayVisible}
                removeSleeperLeague={removeSleeperLeague}
                setIsOverlayVisible={setIsOverlayVisible}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    clearButtonStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    clearButtonContainer: {
        position: 'absolute',
        right: 102,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorTextContainer: {
        alignItems: 'center',
    },
    errorText: { color: 'red' },
    closeButtonIconContainer: {
        borderRadius: 10,
        backgroundColor: Color.CancelGray,
        padding: 3,
    },
    dismissableContainer: { flex: 1 },
    searchButtonContainer: { width: 86, marginLeft: 16 },
    searchButtonStyle: {
        backgroundColor: Color.ActiveBlue,
        height: 40,
    },
});
