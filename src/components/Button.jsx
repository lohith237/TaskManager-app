import { Pressable, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { fonts, radius } from '../../Theme';
import { hp, wp } from '../../Theme/common';
import LoadingIndicator from './LoadingIndicator';
import { lightColors, darkColors } from '../../Theme';

const Button = ({
    title,
    buttonStyle,
    textStyle,
    loading,
    hasShadow,
    onPress,
    disabled = false,
    icon,
    iconPosition = 'left',
    showIcon = false,
    backgroundColor,
    textColor,
}) => {
    const scheme = useColorScheme();
    const isDark = scheme === 'dark';
    const colors = isDark ? darkColors : lightColors;

    const bgColor = backgroundColor || colors.primary;
    const txtColor = colors.background;

    return (
        <Pressable
            onPress={onPress}
            disabled={loading || disabled}
            style={({ pressed }) => [
                styles.button,
                { backgroundColor: bgColor },
                hasShadow && { ...styles.shadow, shadowColor: colors.textDark },
                pressed && styles.pressed,
                buttonStyle,
            ]}
        >
            {loading ? (
                <LoadingIndicator color={txtColor} size="small" />
            ) : (
                <View style={styles.content}>
                    {showIcon && iconPosition === 'left' && <View style={styles.icon}>{icon}</View>}
                    <Text style={[styles.text, { color: txtColor }, textStyle]}>{title}</Text>
                    {showIcon && iconPosition === 'right' && <View style={styles.icon}>{icon}</View>}
                </View>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: hp(6.5),
    },
    text: {
        fontSize: wp(4.5),
        fontFamily: fonts.fontFamily[600],
        backgroundColor: 'transparent',
        textAlign: 'center',
    },
    shadow: {
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    pressed: {
        opacity: 0.75,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginHorizontal: 6,
    },
});

export default Button;
