import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Keyboard,
    ActivityIndicator,
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Constants from 'expo-constants';

import { RootState } from '../store/rootReducer';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Color } from '../common/styles/colors';

const { API_URI } = Constants.manifest.extra;

export const FeedbackScreen = () => {
    const { auth } = useSelector((state: RootState) => state);
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessageShown, setSuccessMessageShown] = useState(false);

    const submitFeedback = async () => {
        if (!feedback.length) {
            setError('You must enter some feedback');
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(
                `${API_URI}/api/feedback`,
                { feedback },
                {
                    headers: {
                        authorization: `Bearer ${auth.token}`,
                    },
                }
            );
            setError('');
            setFeedback('');
            displaySuccessMessage();
        } catch (e) {
            setError('Error submitting feedback');
        }

        setIsLoading(false);
    };

    const displaySuccessMessage = () => {
        setSuccessMessageShown(true);

        setTimeout(() => {
            setSuccessMessageShown(false);
        }, 3000);
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                style={styles.touchableContainer}
            >
                <View>
                    <Text style={styles.textStyle}>
                        Anything that can be improved?
                    </Text>

                    <View style={styles.textAreaContainer}>
                        <TextInput
                            style={styles.textArea}
                            underlineColorAndroid="transparent"
                            placeholder="Your feedback"
                            placeholderTextColor={Color.PlaceholderGray}
                            numberOfLines={5}
                            multiline={true}
                            value={feedback}
                            onChangeText={(text) => setFeedback(text)}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            title="Submit"
                            disabled={isLoading || !feedback.length}
                            containerStyle={styles.buttonContainerStyle}
                            onPress={() => submitFeedback()}
                        />
                    </View>

                    {successMessageShown && (
                        <View style={styles.successMessageContainer}>
                            <Icon
                                name="check-circle"
                                type="material-community"
                                color={Color.SuccessGreen}
                            />

                            <Text style={styles.successMessageText}>
                                Thanks for the feedback!
                            </Text>
                        </View>
                    )}

                    {error ? (
                        <View
                            style={{
                                alignItems: 'center',
                                marginTop: 20,
                            }}
                        >
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    ) : null}

                    {isLoading && <ActivityIndicator size="large" />}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: Color.PureWhite,
    },
    touchableContainer: { height: '100%' },
    textStyle: {
        color: Color.MainBlack,
    },
    textAreaContainer: {
        borderColor: Color.SolidBorderGray,
        borderWidth: 1,
        padding: 5,
        borderRadius: 10,
        marginTop: 12,
    },
    textArea: {
        alignSelf: 'flex-start',
        height: 150,
        textAlignVertical: 'top',
    },
    buttonContainer: { alignItems: 'center', marginTop: 12 },
    buttonContainerStyle: { width: 100 },
    successMessageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        alignItems: 'center',
    },
    successMessageText: { marginLeft: 8 },
    errorText: { color: Color.ErrorRed },
});
