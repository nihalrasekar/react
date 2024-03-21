import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';

interface Props {
    navigation: any;
}

const LoginPage: React.FC<Props> = ({ navigation }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const saveSession = async (): Promise<boolean | null> => {
        try {
            console.log('Attempting to save session...');
            const response = await fetch('http://192.168.1.14:8000/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'username': username.trim(), 'password': password.trim() }),
            });
            console.log('Response:', response);

            if (!response.ok) {
                console.error('Failed to save session');
                throw new Error('Failed to save session');
            }

            const responseData = await response.json();
            console.log('Response Data:', responseData);
            const sessionId = responseData.sessionId;

            await AsyncStorage.setItem('sessionId', sessionId);
            console.log('Session saved successfully');

            return true;
        } catch (error) {
            console.error('Error saving session:', error);
            return null;
        }
    };

    const handleLogin = async (): Promise<void> => {
        try {
            console.log('Logging in...');
            if (!username || !password) {
                if (!username) {
                    Alert.alert('Error', 'Username is not provided.');
                }
                if (!password) {
                    Alert.alert('Error', 'Password is not provided.');
                }
                return;
            }

            const sessionId = await saveSession();
            if (sessionId) {
                navigation.navigate("HomePage");
            } else {
                throw new Error('Failed to save session');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to login. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={setUsername}
                    value={username}
                />
                <View style={styles.passwordInput}>
                    <TextInput
                        style={{ flex: 1 }}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Icon
                            name={showPassword ? 'visibility-off' : 'visibility'}
                            size={24}
                            color="black"
                            style={{ marginLeft: 10 }}
                        />
                    </TouchableOpacity>
                </View>
                <Button title="Login" onPress={handleLogin} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(189, 137, 161)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    form: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    passwordInput: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
});

export default LoginPage;
