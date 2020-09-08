import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { signOut } from '../auth/store/actionCreators';

export const AccountScreen = () => {
    const { auth } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    return (
        <View style={styles.container}>
            <View style={{ marginBottom: 64 }}>
                <Text style={styles.textStyle}>
                    Logged in as: {auth.currentUser.email}
                </Text>
                <Text style={styles.textStyle}>
                    Account ID: {auth.currentUser.id}
                </Text>
            </View>

            <Button title='Sign out' onPress={() => dispatch(signOut())} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textStyle: {
        color: '#adadad',
    },
});
