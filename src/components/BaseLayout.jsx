import { StatusBar,ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { darkColors,lightColors } from '../../Theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const BaseLayout = ({
  children,
  scrollable = false,
  is_backGorund = true,
  style = {},
  isHidden = false,
}) => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const colors=isDark?darkColors:lightColors
  const combinedStyle = {
    ...style,
  };

  return (
    <SafeAreaProvider
      style={[
        styles.safeArea,
        {
          backgroundColor: is_backGorund
            ? isDark ? colors.background : '#FFF'
            : colors.background,
        },
      ]}
    >
      <StatusBar
        hidden={isHidden}
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={
          is_backGorund
            ? isDark ? colors.background : '#FFF'
            : colors.background
        }
      />
      {scrollable ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scrollContainer, combinedStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.container, combinedStyle]}>{children}</View>
      )}
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow:1,
    paddingBottom: 40,
  },
});

export { BaseLayout };
