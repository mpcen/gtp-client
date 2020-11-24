import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { Color } from '../../common/styles/colors';

import { LeaguePlatform } from '../types';
import { removeESPNLeague, removeSleeperLeague } from '../store/actionCreators';

type Props = {
    leaguePlatform: LeaguePlatform;
    league: { leagueId: string; seasonId?: string; leagueName: string };
    isOverlayVisible: boolean;
    closeOverlay: () => void;
};

export const RemoveLeagueOverlay = ({
    leaguePlatform,
    league,
    isOverlayVisible,
    closeOverlay,
}: Props) => {
    const dispatch = useDispatch();

    return (
        <Overlay
            overlayStyle={styles.overlayStyle}
            isVisible={isOverlayVisible}
            onBackdropPress={closeOverlay}
        >
            <View style={styles.overlayBodyStyle}>
                {/* TEXT */}
                <View style={styles.messageContainer}>
                    <Text style={styles.removeText}>
                        Remove {league.leagueName}?
                    </Text>
                </View>

                <View style={styles.overlayButtonContainer}>
                    {/* CANCEL BUTTON */}
                    <Button
                        type="clear"
                        titleStyle={styles.cancelButtonText}
                        title="Cancel"
                        onPress={() => closeOverlay()}
                    />
                    {/* REMOVE BUTTON */}
                    <Button
                        type="clear"
                        title="Remove"
                        buttonStyle={styles.removeButton}
                        titleStyle={styles.removeButtonText}
                        onPress={() => {
                            leaguePlatform === LeaguePlatform.Sleeper
                                ? dispatch(removeSleeperLeague(league.leagueId))
                                : dispatch(
                                      removeESPNLeague(
                                          league.leagueId,
                                          league.seasonId!
                                      )
                                  );
                            closeOverlay();
                        }}
                    />
                </View>
            </View>
        </Overlay>
    );
};

const styles = StyleSheet.create({
    overlayStyle: {
        width: '80%',
        height: '16%',
    },
    overlayBodyStyle: {
        flex: 1,
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    overlayButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    removeText: {
        color: Color.MainBlack,
        fontFamily: 'BebasNeue_400Regular',
    },
    cancelButtonText: {
        color: Color.CancelGray,
        fontFamily: 'BebasNeue_400Regular',
    },
    removeButtonText: {
        color: Color.PureWhite,
        fontFamily: 'BebasNeue_400Regular',
    },
    removeButton: {
        backgroundColor: Color.MainBlack,
    },
});
