import { View, StyleSheet, Text, Image } from 'react-native';

export function Profile () {
    return (
        <View style={StyleSheet.container}>
            <View style={StyleSheet.bio}>
                <Image source={require('../../assets/images/rash_pic1.jpg')} style={styles.img} />
                <Text>Jack Robinson</Text>
                <Text>meetjoeblack@gmail.com</Text>
                <Text>Edit Details + icon</Text>
            </View>

            <View style={styles.details}>
                <View style={styles.city}>
                    
                    <Text style={styles.cityText}>Ikeja, Lagos</Text>
                </View>
                <View style={styles.address}>
                    
                    <Text style={styles.addressText}>62 Gado Nasko Road, Kubwa, Bwari, FCT-Abuja</Text>
                </View>
            </View>

            <View style={styles.passwordChange}>
                <View style={styles.subject}>
                    
                    <Text>Change password</Text>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    img:{
        width:80,
        height:80,
        borderRadius:50
    },
    bio: {

    }
});
