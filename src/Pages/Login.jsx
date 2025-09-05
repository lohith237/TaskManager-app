import React, { useState } from 'react';
import { LoginTemplate } from "../Templates";
import axiosConfig from "../service/axiosConfig";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ route, navigation }) => {
  let { Colors } = route?.params || {};
  const [formData, setFormData] = useState({
    email:"eve.holt@reqres.in",
    password:"pistol"
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axiosConfig.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });
     await AsyncStorage.setItem("AuthToekn",response?.data?.token)
      navigation.reset({
        index:0,
        routes:[{name:"Home"}]
      })
    } catch (error) {
      console.log("Login error:", JSON.stringify(error?.response,null,2) || error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginTemplate
      setFormData={setFormData}
      formData={formData}
      color={Colors}
      loading={loading}
      navigation={navigation}
      handleLogin={handleLogin}
    />
  );
};

export { Login };
