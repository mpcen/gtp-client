import React, { useState } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    Keyboard,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
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

export const ImportESPNLeaguesScreen = () => {
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
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter ESPN League ID"
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
                            size="small"
                        />
                    )}

                    {username && !isLoading ? (
                        <Button
                            iconContainerStyle={styles.closeButtonIconContainer}
                            style={styles.clearButtonStyle}
                            containerStyle={styles.clearButtonContainer}
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
                </View>

                {textInputFocused && (
                    <Button
                        containerStyle={styles.cancelButtonContainerStyle}
                        type="clear"
                        title="Cancel"
                        titleStyle={styles.cancelButtonTitle}
                        onPress={() => Keyboard.dismiss()}
                    />
                )}
            </View>
            {error ? (
                <View style={styles.errorTextContainer}>
                    <Text testID="text-error" style={styles.errorText}>
                        {error}
                    </Text>
                </View>
            ) : null}
            <FlatList
                data={importSleeperLeagues.leagues}
                keyExtractor={({ leagueId }) => leagueId}
                renderItem={({ item }: { item: ImportedSleeperLeague }) => (
                    <LeagueInfoListItem
                        leagueName={item.name}
                        seasonId={item.seasonId}
                        totalTeams={item.totalTeams}
                        itemAdded={item.added}
                        icon={item.added ? 'minus-circle' : 'plus-circle'}
                        leagueAvatar={item.avatar || ''}
                        isLoading={isLoading}
                        onButtonPressCallback={() => {
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
    textInputContainer: {
        flex: 1,
        height: 40,
        justifyContent: 'center',
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
        right: 0,
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
    cancelButtonContainerStyle: { marginLeft: 12 },
    searchSpinner: {
        position: 'absolute',
        right: 12,
        bottom: 0,
        top: 0,
    },
    closeButtonIconContainer: {
        borderRadius: 10,
        backgroundColor: Color.CancelGray,
        padding: 3,
    },
    cancelButtonTitle: {
        color: Color.MainBlack,
        fontFamily: 'BebasNeue_400Regular',
    },
});
