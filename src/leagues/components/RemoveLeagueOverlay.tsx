import React, { SetStateAction } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Overlay, Divider, Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

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
                <View>
                    <Text>Remove League</Text>
                </View>

                <Divider />

                <View style={styles.messageContainer}>
                    <Text>{selectedLeague.leagueName}</Text>
                </View>

                <View style={styles.overlayButtonContainer}>
                    <Button
                        type='outline'
                        title='Cancel'
                        onPress={() => setIsOverlayVisible(false)}
                    />
                    <Button
                        title='Remove'
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
        height: '25%',
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
});
