import { useRouter } from 'expo-router';
import { useState } from 'react';
import API from '../services/api';
import {
    View,
    StyleSheet,
    TextInput,
    Button,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Store API response in res
            const res = await API.post('/auth/login', {
                email,
                password
            });

            console.log('Login response:', res.data);

            const {
                token,
                id,
                name,
                email: userEmail
            } = res.data.data;

            // Save user information
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userId', id.toString());
            await AsyncStorage.setItem('userName', name);
            await AsyncStorage.setItem('userEmail', userEmail);

            // Navigate to tabs
            router.replace('/(tabs)');

        } catch (error) {
            console.error(
                'Error during login:',
                error.response?.data || error.message
            );

            Alert.alert(
                'Login Failed',
                error.response?.data?.message || 'Something went wrong'
            );
        }
    };

    return (
        <View style={styles.container}>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            <Button
                title="Login"
                onPress={handleLogin}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },

    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        margin: 10,
        borderRadius: 5,
    },
});