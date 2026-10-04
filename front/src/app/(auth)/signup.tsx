import { useRouter } from 'expo-router';
import { useState } from 'react';
import API from '../services/api';
import { View, StyleSheet, TextInput } from 'react-native';

export default function Signup() {
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async () => {
        try{
            await API.post('/auth/signup', { name, email, password });
            router.replace('/login');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return(
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style = {styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style = {styles.input}
            />
            
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style = {styles.input}
            />
        </View>
    )
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
    }
});