import { StatusBar as ExpoSatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthNavigator } from './architechure/components/AuthNavigation';
// import { Maps } from './architechure/screens/maps';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
      <ExpoSatusBar style="auto" />
    </SafeAreaView>

    // <Maps />
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // backgroundColor:'#FFBC80',
    marginTop:StatusBar.currentHeight

  },
});
