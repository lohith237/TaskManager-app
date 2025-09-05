import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { fonts, radius } from '../../Theme';
import { hp } from '../../Theme/common';
import DynamicIcon from './DynamicIcon';
import { lightColors, darkColors } from '../../Theme';

const Input = ({
  containerStyle,
  inputRef,
  inputStyle,
  textStyle,
  placeholdercolor,
  iconName,
  iconFamily = 'Feather',
  iconSize = 20,
  iconColor,
  label,
  labelStyle,
  error,
  errorStyle,
  secureTextEntry,
  showToggleEye = false,
  defaultShowPassword = false,
  ...rest
}) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(defaultShowPassword);

  const showError = !!error;
  const isPasswordField = !!secureTextEntry && showToggleEye;

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={[styles.label, { color: colors.primary }, labelStyle]}>
          {label}
        </Text>
      )}

      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: isFocused
              ? colors.primary
              : showError
              ? colors.danger
              : colors.textDark,
            backgroundColor: colors.background,
          },
          inputStyle,
        ]}
      >
        {iconName ? (
          <DynamicIcon
            type={iconFamily}
            name={iconName}
            size={iconSize}
            color={iconColor || colors.textDark}
            style={styles.icon}
          />
        ) : null}

        <TextInput
          ref={inputRef}
          style={[styles.input, { color: colors.textDark }, textStyle]}
          placeholderTextColor={placeholdercolor || colors.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPasswordField ? !showPassword : secureTextEntry}
          {...rest}
        />

        {isPasswordField && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ position: 'absolute', right: 12, padding: 8 }}
          >
            <Feather
              name={showPassword ? 'eye' : 'eye-off'}
              size={18}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {showError && (
        <Text style={[styles.errorText, { color: colors.danger }, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontSize: hp(1.8),
    fontFamily: fonts.fontFamily[400],
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.sm,
    borderWidth: 0.4,
    paddingHorizontal: 25,
    height: hp(6.5),
    borderCurve: 'continuous',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    width: '100%',
    fontSize: 16,
  },
  errorText: {
    fontSize: hp(1.6),
    marginTop: 4,
    fontFamily: fonts.fontFamily[400],
  },
});

export default Input;
