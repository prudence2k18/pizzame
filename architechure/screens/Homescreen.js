import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput } from "react-native";
import { Card, Button, Title, Paragraph, } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Overpass_100Thin, Overpass_200ExtraLight } from '@expo-google-fonts/overpass';
import { Header } from "../components/header";
import { Menu } from "../components/Menu";
import { Notifications } from "./Notifications";
import { History } from "./history";
import { Customize } from "./customize";
import { Profile } from "./Profile";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../theme/theme";

const data = {
    favourites: [
        {name:'mozzarella', price:3600,rating:4.5, id:'1',thumbnail:'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=600'},
        {name:'parmesan', price:3450,rating:4.3, id:'2',thumbnail:'https://images.pexels.com/photos/6488941/pexels-photo-6488941.jpeg?auto=compress&cs=tinysrgb&w=600'},
        {name:'provolone', price:3600,rating:4.2, id:'3',thumbnail:'https://images.pexels.com/photos/7362684/pexels-photo-7362684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        {name:'blue cheese', price:4100,rating:4.9, id:'4',thumbnail:'https://images.pexels.com/photos/5907902/pexels-photo-5907902.jpeg?auto=compress&cs=tinysrgb&w=600'},
        {name:'broccoli', price:3250,rating:4.2, id:'5',thumbnail:'https://images.pexels.com/photos/5640020/pexels-photo-5640020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}
    ],
    bakersChoice:[
        {name:'pancetta',id:'6',note:'Made with the finest Italian ingredients',thumbnail:'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg'},
        {name:'speck',id:'7',note:'Made with the finest Italian ingredients',thumbnail:'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg'},
        {name:'anchovies',id:'8',note:'Made with the finest Italian ingredients',thumbnail:'https://images.pexels.com/photos/905847/pexels-photo-905847.jpeg'},
        {name:'zucchini',id:'9',note:'Made with the finest Italian ingredients',thumbnail:'https://images.pexels.com/photos/708587/pexels-photo-708587.jpeg'},
        {name:'pancetta',id:'10',note:'Made with the finest Italian ingredients',thumbnail:'https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg'}
    ]
}

function HomeScreen ({navigation}) {
    let [FontsLoaded] = useFonts({
        Pacifico_400Regular,
        Overpass_100Thin,
        Overpass_200ExtraLight
      });
    return (

        <View style={Styles.container}>
            <Header />
                <TextInput
                    placeholder='search for a topin'
                    style={Styles.search}
                    />

                    {/* <Card>
                        <Card.Cover source={require('../../assets/images/eatingpizza.jpg')}/>
                    </Card> */}

                <View style={Styles.popular}>
                    <Text style={Styles.popularHeadingText}>popular topins</Text>
                    <FlatList data={data.favourites} renderItem={({item}) => {
                        return (
                            <TouchableOpacity style={Styles.popularItem} onPress={ () => {
                                navigation.navigate('Popular',{pizzaName:'somthing',PizzaRating:5});
                            } }>
                            <Image source={{uri:item.thumbnail}} style={{width:60, height:60}} />
                                <Text style={Styles.popularItemText}>{item.name}</Text>
                            </TouchableOpacity>
                        );
                    }} key={ ({item}) => {item.id}} horizontal/>

                </View>

               {/* baker's choice */}
                    <View style={Styles.bakersChoice}>
                    <Text style={Styles.subHeading}>Baker's Choice </Text>

                    <FlatList data={data.bakersChoice} renderItem={({item}) => {
                        return (
                            <Card style={{marginBottom:10}}>
                                <Card.Cover source={{ uri: item.thumbnail }} />
                                <Card.Content>
                                    <Title>{item.name}</Title>
                                    <Paragraph>{item.note}</Paragraph>
                                    <Button mode='contained' color={Theme.colors.ui.secondary}>Order</Button>
                                </Card.Content>
                            </Card>
                        );
                    }} key={ ({item}) => {item.id}} />
                    </View>
            <Menu />
        </View>
    );
}

const Tab = createBottomTabNavigator();

export function Home () {
    return (
        <Tab.Navigator 
        
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'HomeScreen') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'History') {
                iconName = focused ? 'md-file-tray-stacked' : 'ios-file-tray-stacked-outline';
              }
              else if (route.name === 'Customize') {
                iconName = focused ? 'ios-logo-codepen' : 'ios-logo-codepen';
              }
              else if (route.name === 'Profile') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
              }
              else if (route.name === 'Notifications') {
                iconName = focused ? 'notifications-circle' : 'notifications-circle-outline';
              }
  
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#F76E11',
            tabBarInactiveTintColor: 'gray',
          })}

        >
           <Tab.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}} />
           <Tab.Screen name='History' component={History} />
           <Tab.Screen name='Customize' component={Customize} options={{headerShown:false}} />
           <Tab.Screen name='Profile' component={Profile} />
           <Tab.Screen name='Notification' component={Notifications} />
        </Tab.Navigator>
    )
}

const Styles = StyleSheet.create({
    container: {
        flex:1,
        // flexDirection:'column',
        // justifyContent:'space-between',
        paddingHorizontal: 20
    },

    search:{
        marginTop:Theme.points[3],
        paddingVertical:Theme.points[3],
        paddingLeft:Theme.points[3],
        borderWidth:1,
        borderColor:Theme.colors.ui.secondary,
        borderRadius:50,
        backgroundColor:'#fff',
        fontSize:Theme.points[3]
    },

    popularHeadingText:{
        fontSize:Theme.points[4],
        marginBottom:Theme.points[2],
        marginTop:Theme.points[3],
    },

    popularItem:{
        width:120,
        height:120,
        paddingVertical:Theme.points[2],
        paddingHorizontal:Theme.points[2],
        backgroundColor:Theme.colors.ui.secondary,
        alignItems:'center',
        justifyContent:'center',
        marginRight:Theme.points[1]
    },

    popularItemText:{
        color:Theme.colors.text.primary,
        fontWeight:'bold',
    },

    subHeading:{
        fontSize:Theme.points[4],
        marginBottom:Theme.points[2],
        marginTop:Theme.points[3],
    }
})