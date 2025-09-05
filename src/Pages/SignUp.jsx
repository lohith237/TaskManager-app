import React, { useState } from 'react';
import { LoginTemplate, SignUpTemplate } from "../Templates";
import axiosConfig from "../service/axiosConfig";

const SignUp = ({ route, navigation }) => {
    let { Colors } = route?.params || {};
    const [formData, setFormData] = useState({
        username:"",
        email: 'eve.holt@reqres.in',
        password: 'pistol',
    });
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        try {
            setLoading(true);
            const res = await axiosConfig.post('/api/register', {
                email: 'eve.holt@reqres.in',
                password: 'pistol',
            });

            navigation.navigate("Login")
        } catch (error) {
            console.log("Login error:", JSON.stringify(error?.response, null, 2) || error.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        <SignUpTemplate
            setFormData={setFormData}
            formData={formData}
            loading={loading}
            handleRegister={handleRegister}
            color={Colors}
            navigation={navigation}
        />
    );
};

export { SignUp };
