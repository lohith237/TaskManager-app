import { Picker } from '@react-native-picker/picker';
import { Platform, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { hp } from '../../Theme/common';
import { radius, darkColors, lightColors } from '../../Theme';

const DropdownInput = ({
    label,
    description,
    data = [],
    value,
    onChange,
    error,
    containerStyle,
    labelStyle,
    pickerContainerStyle,
    pickerStyle,
    descriptionStyle,
    itemStyle,
    errorStyle,
    placeholder = "Select an option",
    placeholderTextColor,
    disabled = false,
}) => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const themeColors = isDark ? darkColors : lightColors;
    const textColor = themeColors.text;
    const borderColor = error ? themeColors.danger : themeColors.gray;

    return (
        <View style={[{ width: "100%" }, containerStyle]}>
            {label && <Text style={[styles.label, { color: textColor }, labelStyle]}>{label}</Text>}

            <View
                style={[
                    styles.pickerContainer,
                    { borderColor },
                    pickerContainerStyle,
                    disabled && styles.disabled,
                ]}
            >
                <Picker
                    selectedValue={value}
                    onValueChange={(val) => onChange && onChange(val)}
                    enabled={!disabled}
                    style={[
                        styles.picker,
                        { color: value ? textColor : (placeholderTextColor || themeColors.placeholder) },
                        pickerStyle,
                    ]}
                    dropdownIconColor={textColor}
                    mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
                    itemStyle={[{ color: textColor }, itemStyle]}
                >
                    <Picker.Item
                        label={placeholder}
                        value={null}
                        color={placeholderTextColor || themeColors.placeholder}
                    />
                    {data.map((item, index) => (
                        <Picker.Item
                            key={index}
                            label={item.label}
                            value={item.value}
                            color={textColor}
                        />
                    ))}
                </Picker>
            </View>

            {!error && description && (
                <Text style={[styles.description, { color: themeColors.subText }, descriptionStyle]}>
                    {description}
                </Text>
            )}
            {error && (
                <Text style={[styles.error, errorStyle]}>{error}</Text>
            )}
        </View>
    );
};

export default DropdownInput;

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    pickerContainer: {
        borderWidth: 1,
        borderRadius: radius.xl,
        height: hp(5),
        justifyContent: 'center',
        paddingHorizontal: 5,
    },
    picker: {
        width: '100%',
    },
    description: {
        fontSize: 12,
        marginTop: 4,
    },
    error: {
        fontSize: 12,
        color: 'red',
        marginTop: 4,
    },
    disabled: {
        opacity: 0.6,
    },
});
