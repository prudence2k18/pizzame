import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "react-native-paper";

export function Profile () {
    return (
        <View style={Styles.container}>
            <View style={Styles.bio}>
                <Image style={Styles.profPic} source={require('../../assets/images/rash_pic1.jpg')} />
                <Text style={Styles.profName}> Marcus Rashford</Text>
                <Text>meetjoelblack@gmail.com</Text>
                <Text> Edit Details + icon</Text>
                {/* icon to modify detail */}
            </View>

            <View style={Styles.details}>
                <View style={Styles.city}>
                    {/* icon pointer */}
                    {/* <Image style={Styles.location} source={require('../../assets/images/map-locator.png')} /> */}
                    <Text style={Styles.cityText}>Ikeja Lagos</Text>
                </View>

                <View style={Styles.address}>
                    {/* map icon */}
                    {/* <Image style={Styles.advlocation} source={require('../../assets/images/treasure-map.png')} /> */}
                    <Text style={Styles.addressText}>62 Gado Nasko Road, Kubwa, Bwari</Text>
                </View>
                
            </View>

            <View style={Styles.passwordChange}>
                <View style={Styles.subject}>
                    {/* icon */}
                    <Button mode='contained' style={Styles.btn}>Change password</Button>
                </View>
                 {/* icon point right */}
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{

    },

    bio:{
        alignItems:'center',
        backgroundColor:'#E6E6E3'
    },
    profPic:{
        width: 300,
        height: 300,
        borderRadius: 300,
        marginBottom:10
    },
    profName:{
        fontSize:30,
        fontWeight:'bold'
    },
    btn:{
        paddingVertical:18,
        marginHorizontal:20,
        marginBottom:20,
    },
    location:{

    },
    advlocation:{

    }
})