import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/Type';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

export default function AboutScreen({ route }: Props) {
  const { name, age } = route.params;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>About Screen</Text>
            <Text>Name: {name}</Text>
            <Text>Age: {age}</Text>
        </View>
    );
}