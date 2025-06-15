console.log("🔥 Firebase DB is:", db);
import { db } from './services/firebase'; // Ensure this path is correct
console.log("🔥 Firebase DB is:", db);
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
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
      {/* <Maps /> */}
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // backgroundColor:'#FFBC80',
    marginTop:StatusBar.currentHeight

  },
});
