import { View, Text, KeyboardAvoidingView, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { BaseLayout } from "../components/BaseLayout";
import Input from "../components/Input";
import Button from "../components/Button";
import { hp } from '../../Theme';
const SignUpTemplate = ({color,navigation,setFormData, formData,loading, handleRegister }) => {
    return (
        <BaseLayout scrollable={true}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Text style={styles.title}>SignUp</Text>
                          <Input
                            label="Email"
                            placeholder="Enter your Name"
                            value={formData?.username}
                            onChangeText={(val) => setFormData({ ...formData, username: val })}
                            keyboardType="default"
                            autoCapitalize="none"
                            inputStyle={{ marginBottom: hp(2) }}
                        />

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
                            <Button title="Register" onPress={handleRegister} disabled={loading} loading={loading} />
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

export { SignUpTemplate };
