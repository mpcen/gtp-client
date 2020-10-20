import React, { SetStateAction } from 'react';
import { Text, StyleSheet, Switch, View } from 'react-native';

import { Font } from '../../common/fonts/fonts';
import { Color } from '../../common/styles/colors';

type Props = {
    isH2H: boolean;
    setIsH2H: React.Dispatch<SetStateAction<boolean>>;
};

export const GarbageTimeMatchupsCompareSelector = ({
    isH2H,
    setIsH2H,
}: Props) => {
    const toggleSwitch = () => setIsH2H((previousState) => !previousState);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>ALL</Text>
            <Switch
                style={styles.switchStyle}
                trackColor={{
                    false: Color.LightGray,
                    true: Color.ActiveBlue,
                }}
                thumbColor={Color.SwitchBackground}
                ios_backgroundColor={Color.LightGray}
                onValueChange={toggleSwitch}
                value={isH2H}
            />
            <Text style={styles.text}>H2H</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    switchStyle: { transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] },
    text: { fontFamily: Font.BebasNeue_400Regular },
});
