import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export const LeaguesScreen = () => {
    const { navigate } = useNavigation();

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Button title='Add League' onPress={() => navigate('AddLeague')} />
        </View>
    );
};
