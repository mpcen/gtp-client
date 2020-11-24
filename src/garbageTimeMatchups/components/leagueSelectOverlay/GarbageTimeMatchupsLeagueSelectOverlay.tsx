import React, { SetStateAction } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Overlay } from 'react-native-elements';
import { TabView } from 'react-native-tab-view';

import { UserLeagues } from '../../../leagues/store/storeTypes';
import { OverlayTypes } from '../../types';
import { ESPNLeagueSelectRoute } from './ESPNLeagueSelectRoute';
import { SleeperLeagueSelectRoute } from './SleeperLeagueSelectRoute';

type Props = {
    overlay: OverlayTypes;
    userLeagues: UserLeagues;
    setOverlay: React.Dispatch<SetStateAction<OverlayTypes>>;
};

type RenderSceneRouteProps = {
    key: string;
    title: string;
};

const initialLayout = { width: Dimensions.get('window').width };

export const GarbageTimeMatchupsLeagueSelectOverlay = ({
    overlay,
    userLeagues,
    setOverlay,
}: Props) => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'sleeper', title: 'Sleeper' },
        { key: 'espn', title: 'ESPN' },
    ]);

    const renderScene = ({ route }: { route: RenderSceneRouteProps }) => {
        switch (route.key) {
            case 'sleeper':
                return (
                    <SleeperLeagueSelectRoute leagues={userLeagues.sleeper} />
                );

            case 'espn':
                return <ESPNLeagueSelectRoute leagues={userLeagues.espn} />;

            default:
                return null;
        }
    };

    return (
        <Overlay
            overlayStyle={styles.teamSelectOverlayStyle}
            isVisible={overlay === OverlayTypes.LeagueSelect}
            onBackdropPress={() => setOverlay(OverlayTypes.None)}
        >
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
        </Overlay>
    );
};

const styles = StyleSheet.create({
    teamSelectOverlayStyle: {
        flexDirection: 'row',
        height: '50%',
        marginLeft: 20,
        marginRight: 20,
    },
});