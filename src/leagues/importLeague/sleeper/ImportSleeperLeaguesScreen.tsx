import React, { useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Keyboard,
    TextInput,
    StyleSheet,
    FlatList,
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

export const ImportSleeperLeaguesScreen = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const { importSleeperLeagues, isLoading, error } = useSelector(
        (state: RootState) => state.leagues
    );
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState(
        {} as ImportedSleeperLeague
    );
    const [textInputFocused, setTextInputFocused] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Enter Sleeper username'
                        value={username}
                        onChangeText={setUsername}
                        onFocus={() => setTextInputFocused(true)}
                        onBlur={() => setTextInputFocused(false)}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();

                            if (username) {
                                dispatch(findSleeperLeaguesForUser(username));
                            }
                        }}
                    />

                    {isLoading && (
                        <ActivityIndicator
                            style={styles.searchSpinner}
                            size='small'
                        />
                    )}

                    {username && !isLoading ? (
                        <Button
                            iconContainerStyle={styles.closeButtonIconContainer}
                            style={styles.clearButtonStyle}
                            containerStyle={styles.clearButtonContainer}
                            type='clear'
                            icon={{
                                name: 'close',
                                type: 'material-community',
                                size: 12,
                                color: '#F5F6F4',
                            }}
                            onPress={() => setUsername('')}
                        />
                    ) : null}
                </View>

                {textInputFocused && (
                    <Button
                        containerStyle={styles.cancelButtonContainerStyle}
                        type='clear'
                        title='Cancel'
                        onPress={() => Keyboard.dismiss()}
                    />
                )}
            </View>

            {error ? (
                <Text testID='text-error' style={styles.errorText}>
                    {error}
                </Text>
            ) : null}

            <FlatList
                data={importSleeperLeagues.leagues}
                keyExtractor={({ leagueId }) => leagueId}
                renderItem={({ item }: { item: ImportedSleeperLeague }) => (
                    <LeagueInfoListItem
                        leagueName={item.name}
                        seasonId={item.seasonId}
                        totalTeams={item.totalTeams}
                        icon={item.added ? 'minus' : 'plus'}
                        leagueAvatar={item.avatar}
                        onPressCallback={() => {
                            if (item.added) {
                                setIsOverlayVisible(true);
                                setSelectedLeague(item);
                            } else {
                                dispatch(addSleeperLeague(item.leagueId));
                            }
                        }}
                    />
                )}
            />

            <RemoveLeagueOverlay
                selectedLeague={{
                    leagueId: selectedLeague.leagueId,
                    leagueName: selectedLeague.name,
                }}
                isOverlayVisible={isOverlayVisible}
                removeSleeperLeague={removeSleeperLeague}
                setIsOverlayVisible={setIsOverlayVisible}
            />
        </View>
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
    textInputContainer: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
    },
    textInput: {
        flex: 1,
        height: 40,
        paddingLeft: 20,
        backgroundColor: '#F5F6F4',
        borderRadius: 50,
    },
    clearButtonStyle: {
        flex: 1,
        justifyContent: 'center',
    },
    clearButtonContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: { color: 'red' },
    cancelButtonContainerStyle: { marginLeft: 12 },
    searchSpinner: {
        position: 'absolute',
        right: 12,
        bottom: 0,
        top: 0,
    },
    closeButtonIconContainer: {
        borderRadius: 10,
        backgroundColor: '#aaa',
        padding: 3,
    },
});
