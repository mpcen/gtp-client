import React, { SetStateAction } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { Color } from '../../common/styles/colors';

import { LeagueDispatchTypes } from '../store/dispatchTypes';

type Props = {
    selectedLeague: { leagueId: string; leagueName: string };
    isOverlayVisible: boolean;
    removeSleeperLeague: (
        leagueId: string
    ) => (dispatch: Dispatch<LeagueDispatchTypes>) => Promise<void>;
    setIsOverlayVisible: React.Dispatch<SetStateAction<boolean>>;
};

export const RemoveLeagueOverlay = ({
    selectedLeague,
    isOverlayVisible,
    removeSleeperLeague,
    setIsOverlayVisible,
}: Props) => {
    const dispatch = useDispatch();

    return (
        <Overlay
            overlayStyle={styles.overlayStyle}
            isVisible={isOverlayVisible}
            onBackdropPress={() => setIsOverlayVisible(false)}
        >
            <View style={styles.overlayBodyStyle}>
                {/* TEXT */}
                <View style={styles.messageContainer}>
                    <Text style={styles.removeText}>
                        Remove {selectedLeague.leagueName}?
                    </Text>
                </View>

                <View style={styles.overlayButtonContainer}>
                    {/* CANCEL BUTTON */}
                    <Button
                        type="clear"
                        titleStyle={styles.cancelButtonText}
                        title="Cancel"
                        onPress={() => setIsOverlayVisible(false)}
                    />
                    {/* REMOVE BUTTON */}
                    <Button
                        type="clear"
                        title="Remove"
                        buttonStyle={styles.removeButton}
                        titleStyle={styles.removeButtonText}
                        onPress={() => {
                            dispatch(
                                removeSleeperLeague(selectedLeague.leagueId)
                            );
                            setIsOverlayVisible(false);
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
