import React, { SetStateAction } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

type Props = {
    isPasswordVisible: boolean;
    setIsPasswordVisible: React.Dispatch<SetStateAction<boolean>>;
};

export const PasswordVisibilityIcon = ({
    isPasswordVisible,
    setIsPasswordVisible,
}: Props) => {
    return (
        <TouchableOpacity
            style={styles.passwordVisibilityButton}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
            <Icon
                name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                type='material-community'
                color='#adadad'
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    passwordVisibilityButton: {
        marginRight: 10,
        position: 'absolute',
        right: 0,
        top: 8,
        justifyContent: 'center',
    },
});
