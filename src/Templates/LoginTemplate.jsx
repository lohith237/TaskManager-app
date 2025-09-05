import { View, Text, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableWithoutFeedback, Pressable } from 'react-native';
import React, { useState } from 'react';
import { BaseLayout } from "../components/BaseLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { fonts, hp } from '../../Theme';
const LoginTemplate = ({color, setFormData, formData, loading, handleLogin,navigation }) => {
    return (
        <BaseLayout scrollable={true}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.title}>Login</Text>

                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            value={formData?.email}
                            onChangeText={(val) => setFormData({ ...formData, email: val })}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            iconName="mail"
                            iconFamily="Feather"
                            inputStyle={{ marginBottom: hp(2) }}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            value={formData?.password}
                            onChangeText={(val) => setFormData({ ...formData, password: val })}
                            secureTextEntry
                            showToggleEye
                            iconName="lock"
                            iconFamily="Feather"
                        />

                        <View style={styles.buttonWrapper}>
                            <Button title="Login" onPress={handleLogin} disabled={loading} loading={loading} />
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Text>Don't have an account? </Text>
                            <Pressable onPress={()=>navigation.navigate("SignUp")}>
                                <Text style={{ color:color.primary,fontFamily:fonts.fontFamily[700] }}>Signup</Text>
                            </Pressable>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </BaseLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
    },
    buttonWrapper: {
        marginTop: 20,
        width: '100%',
    },
});

export { LoginTemplate };
