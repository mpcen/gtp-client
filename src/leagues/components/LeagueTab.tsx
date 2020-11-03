import { Asset } from 'expo-asset';
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

import { Font } from '../../common/fonts/fonts';
import { Color } from '../../common/styles/colors';
import { LeaguePlatform } from '../types';

type Props = {
    platform: LeaguePlatform;
    focused: boolean;
};

export const LeagueTab = ({ platform, focused }: Props) => {
    const sleeperThumbUri = Asset.fromModule(
        require('../../../assets/sleeper-thumb.png')
    ).uri;
    const espnThumbUri = Asset.fromModule(
        require('../../../assets/espn-thumb.png')
    ).uri;

    return (
        <View style={styles.container}>
            <Image
                style={
                    platform === LeaguePlatform.Sleeper
                        ? styles.sleeperImgStyle
                        : styles.espnImgStyle
                }
                source={{
                    uri:
                        platform === LeaguePlatform.Sleeper
                            ? sleeperThumbUri
                            : espnThumbUri,
                }}
            />
            <Text
                style={[
                    styles.textStyle,
                    focused ? styles.tabActive : styles.tabInactive,
                ]}
            >
                {platform}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyle: {
        width: 18,
        height: 18,
        borderRadius: 5,
    },
    sleeperImgStyle: { width: 17, height: 17, borderRadius: 5 },
    espnImgStyle: { width: 32, height: 32 },
    textStyle: {
        fontSize: 18,
        fontFamily: Font.BebasNeue_400Regular,
        marginLeft: 8,
    },
    tabActive: { color: Color.MainBlack },
    tabInactive: { color: Color.InactiveGray },
});
