import * as Device from 'expo-device';
import { Platform, StyleSheet, View, Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { HintRow } from '@/components/hint-row';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

export default function HomeScreen() {
  return (
    <View style = {styles.container}>
  <Image source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvRSWgHRVrPKgooK_8dwnMt5Z21kbfnCWSr4JdOR_UnwrMDwLZYUEKz8U&s=10'}} style={{ width: 100, height: 100 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});