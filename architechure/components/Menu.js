import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faTruck } from '@fortawesome/free-solid-svg-icons';



export function Menu () {
    return (
        <View style={Styles.horDisplay}>
            <TouchableOpacity style={Styles.icon}>
                <FontAwesomeIcon icon={faHouseChimney} style={Styles.icon} size={36} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={Styles.icon}>
                <FontAwesomeIcon icon={faTruck} style={Styles.icon} size={36} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={Styles.icon}>
            <FontAwesomeIcon icon={faWallet} style={Styles.icon} size={36} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={Styles.icon}>
            <FontAwesomeIcon icon={faBell} style={Styles.icon} size={36} color="white" />
            </TouchableOpacity>

            <TouchableOpacity style={Styles.icon}>
            <FontAwesomeIcon icon={faCircleUser} style={Styles.icon} size={36} color="white" />
            </TouchableOpacity>
        </View>
    )

}

const Styles = StyleSheet.create({
    horDisplay: {
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#fff',
        paddingHorizontal:10,
        paddingVertical:10,
        position:'absolute',
        borderTopRightRadius:20,
        borderTopLeftRadius:20,
        bottom:0,
        left:0,
        right:0
    },

    icon: {
        width:60,
        height:60,
        backgroundColor:'#F76E11',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
    },

    order: {
        width:80,
        height:80,
        backgroundColor:'#F76E11',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50
    }
})