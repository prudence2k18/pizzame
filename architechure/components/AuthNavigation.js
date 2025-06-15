import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Intro } from "../screens/intro";
import { Home } from "../screens/Homescreen";
import { Profile } from "../screens/Profile";
import { Popular } from "../screens/popular";
import { Theme } from "../theme/Theme";
import { Order } from "../screens/order";
import { Pay } from "../screens/pay";
import { Signup } from "../screens/Signup";

const Stack = createNativeStackNavigator();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="Popular"
        component={Popular}
        options={{
          headerShown: true,
          title: "Popular pizza",
          headerStyle: {
            backgroundColor: Theme.colors.ui.success,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: parseInt(Theme?.fonts?.size?.title) || 20,
          },
          headerBackTitle: "Go back",
        }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Pay"
        component={Pay}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}
