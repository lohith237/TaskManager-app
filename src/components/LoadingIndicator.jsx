import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

const LoadingIndicator = ({ color = '#fff', size = 'large' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={color} size={size} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default LoadingIndicator
