import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://reqres.in',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': 'reqres-free-v1',
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to load auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
