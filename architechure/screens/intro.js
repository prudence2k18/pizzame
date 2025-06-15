import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { Button } from 'react-native-paper';

export function Intro ({navigation}) {
    return (
        <View style={styles.container}>
            

            <ImageBackground 
            source={require('../../assets/images/pizza_intro.jpg')}
            style={styles.imgBg} 
            resizeMode='cover'
            >
                <View style={styles.brand}>
                    <Image source={require('../../assets/images/pizza.png')} style={styles.brandImg} />
                    <Text style={styles.brandText}>PizzaMe</Text>
                </View>

                <Button 
                mode='contained' 
                color='#FF9F45' 
                style={styles.btn}
                onPress={ () => navigation.navigate('Home') }
                >Explore PizzaMe</Button>
            </ImageBackground>

        
        </View>
    )
}

const styles = StyleSheet.create({
    imgBg:{
        height: '100%',
        width:'100%',
        justifyContent:'space-between'
    },
    brand:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    brandImg:{
        width: 40,
        height:40,
        marginRight:5
    },
    brandText:{
        fontSize:32,
        color:'#fff',
        fontWeight:'bold'
    },
    btn:{
        marginHorizontal:20,
        marginBottom: 20
    }
})