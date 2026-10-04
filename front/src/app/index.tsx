import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace('/login');
        }else {
          router.replace('/home');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLogin();
  }, [router]);

  return null; // You can return a loading indicator or splash screen here if needed
}
