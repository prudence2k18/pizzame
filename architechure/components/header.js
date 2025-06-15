import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {useFonts, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { Overpass_100Thin, Overpass_200ExtraLight } from '@expo-google-fonts/overpass';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../theme/Theme';

export function Header () {
    let [FontsLoaded] = useFonts({
        Pacifico_400Regular,
        Overpass_100Thin,
        Overpass_200ExtraLight
      });
    return (
        <View style={Styles.header}>
                <View style={Styles.brand}>
                    <Image 
                        source={require('../../assets/images/pizza.png')}
                        style={Styles.logo}/>
                    <Text style={Styles.brandName}>Pizzame</Text>
                </View>
                <TouchableOpacity>
                    <FontAwesomeIcon icon={faArrowRightToBracket} size={Theme.sizes.icon}/>
                </TouchableOpacity>
            </View>
    )
}

const Styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop: Theme.spacing.md
    },

    brand:{
        flexDirection:'row',
    },

    logo:{
        width:48,
        height:48,
        marginRight: Theme.spacing.sm
    }, 

    signinIcon:{
        width:40,
        height:40
    },

    brandName: {
        fontSize: Theme.fonts.size.title,
        fontWeight: 'bold',
        fontFamily:'Pacifico_400Regular'
    },
});