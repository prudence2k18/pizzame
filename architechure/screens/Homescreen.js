import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Card, Title, Paragraph, Button } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
// import { useFonts, Lato_100Thin } from '@expo-google-fonts/lato';
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { History } from "./history";
import { Customize } from "./customize";
import { Profile } from "./Profile";
import { Notifications } from "./Notifications";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../theme/Theme";

const data = {
  favourites: [
    {
      name: "Mozzarella",
      price: 3450,
      rating: 3.2,
      id: "1",
      thumbnail:
        "https://cdn-icons.flaticon.com/png/512/2454/premium/2454219.png?token=exp=1656954610~hmac=205b712d391169cf1d932a9d0e7ba82a",
    },
    {
      name: "Parmesan",
      price: 3250,
      rating: 2.4,
      id: "2",
      thumbnail:
        "https://cdn-icons.flaticon.com/png/512/2497/premium/2497913.png?token=exp=1656594472~hmac=7c065c3ac82f4394166025fe725dcb8d",
    },
    {
      name: "Provolone",
      price: 2500,
      rating: 4.9,
      id: "3",
      thumbnail: "https://cdn-icons-png.flaticon.com/512/1384/1384676.png",
    },
    {
      name: "Blue Cheese",
      price: 4950,
      rating: 4.1,
      id: "4",
      thumbnail: "https://cdn-icons-png.flaticon.com/512/2674/2674065.png",
    },
    {
      name: "Broccoli",
      price: 3050,
      rating: 1.2,
      id: "5",
      thumbnail: "https://cdn-icons-png.flaticon.com/512/432/432339.png",
    },
  ],
  bakersChoice: [
    {
      name: "pancetta",
      id: "6",
      note: "Made with the finest Italian ingredients",
      thumbnail:
        "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
    },
    {
      name: "speck",
      id: "7",
      note: "Made with the finest Italian ingredients",
      thumbnail:
        "https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg",
    },
    {
      name: "anchovies",
      id: "8",
      note: "Made with the finest Italian ingredients",
      thumbnail:
        "https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg",
    },
    {
      name: "zucchini",
      id: "9",
      note: "Made with the finest Italian ingredients",
      thumbnail:
        "https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg",
    },
    {
      name: "pancetta",
      id: "10",
      note: "Made with the finest Italian ingredients",
      thumbnail:
        "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
    },
  ],
};

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.brand}>
          <Text style={styles.brandName}>Pizzame</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
          <FontAwesomeIcon
            icon={faArrowRightToBracket}
            size={Theme.points[4]}
          />
        </TouchableOpacity>
      </View>

      <TextInput placeholder="search for a topin" style={styles.search} />

      <View style={styles.popular}>
        <Text style={styles.popularHeadingText}>Polular topins</Text>
        <FlatList
          data={data.favourites}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.popularItem}
                onPress={() => {
                  navigation.navigate("Popular", {
                    pizzaImg: item.thumbnail,
                    pizzaName: item.name,
                    pizzaRating: item.rating,
                    pizzaPrice: item.price,
                  });
                }}
              >
                <Image
                  source={{ uri: item.thumbnail }}
                  style={{ width: 60, height: 60 }}
                />
                <Text style={styles.popularItemText}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
          key={({ item }) => {
            item.id;
          }}
          horizontal
        />
      </View>

      {/* baker's choice */}
      <View style={styles.bakersChoice}>
        <Text style={styles.popularHeadingText}>Baker's choice</Text>
        <FlatList
          data={data.bakersChoice}
          renderItem={({ item }) => {
            return (
              <Card style={{ marginBottom: 10 }}>
                <Card.Cover source={{ uri: item.thumbnail }} />
                <Card.Content>
                  <Title>{item.name}</Title>
                  <Paragraph>{item.note}</Paragraph>
                  <Button mode="contained" color={Theme.colors.ui.secondary}>
                    Order
                  </Button>
                </Card.Content>
              </Card>
            );
          }}
          key={({ item }) => {
            item.id;
          }}
        />
      </View>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export function Home() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = focused
              ? "md-file-tray-stacked"
              : "ios-file-tray-stacked-outline";
          } else if (route.name === "Customize") {
            iconName = focused ? "ios-logo-codepen" : "ios-logo-codepen";
          } else if (route.name === "Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          } else if (route.name === "Notifications") {
            iconName = focused
              ? "notifications-circle"
              : "notifications-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F76E11",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen
        name="Customize"
        component={Customize}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Notifications" component={Notifications} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Theme.points[3],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: Theme.points[2],
  },
  brand: {
    flexDirection: "row",
  },
  brandName: {
    fontSize: Theme.points[4],
    fontWeight: "bold",
    fontFamily: "Pacifico_400Regular",
  },
  search: {
    marginTop: Theme.points[3],
    paddingVertical: Theme.points[3],
    paddingLeft: Theme.points[3],
    borderWidth: 1,
    borderColor: Theme.colors.ui.secondary,
    borderRadius: 50,
    backgroundColor: "#fff",
    fontSize: Theme.points[3],
  },
  popularHeadingText: {
    fontSize: Theme.points[4],
    marginBottom: Theme.points[2],
    marginTop: Theme.points[3],
  },
  popularItem: {
    width: 120,
    height: 120,
    paddingVertical: Theme.points[2],
    paddingHorizontal: Theme.points[2],
    backgroundColor: Theme.colors.ui.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Theme.points[1],
  },
  popularItemText: {
    color: Theme.colors.text.primary,
    fontWeight: "bold",
  },
});
