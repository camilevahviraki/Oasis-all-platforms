import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToStorage = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save data', error);
    }
};

export const getFromStorage = async (key) => {
    try {
        const savedData = await AsyncStorage.getItem('userCredentials');
        return savedData ? JSON.parse(savedData) : null;
    } catch (error) {
        console.error('Failed to fetch data', error);
        return null;
    }
};

export const removeFromStorage = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Failed to clear storage', error);
    }
};

export const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.error('Failed to clear storage', error);
    }
};
