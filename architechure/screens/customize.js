import { useState } from 'react';
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { pizzas } from '../../assets/data/pizzas';
import { pizzaSizes } from '../../assets/data/pizzas';
// import Constants from 'expo-constants';
// import { Card } from 'react-native-paper';



export function Customize({navigation, route}) {
    const [selected, setSelected] = useState({});
    const [total, setTotal] = useState(0);
    const [pizzaNames, setPizzaNames] = useState('');
    const [spices, setSpices] = useState(['']);
    const [sizeName, setSizeName] = useState('');

    const [isPress, setIsPress] = React.useState(false);


    const touchProps = {
        activeOpacity: 1,
        underlayColor: 'blue',
        style: isPress ? styles.btnPress : styles.btnNormal,
        onHideUnderlay: () => setIsPress(false),
        onShowUnderlay: () => setIsPress(true),
    };

    
    function ProccedToDelivery() {
        if (total > 0) {
            return <Button mode='outlined' color='white'
                style={{ marginTop: 20, backgroundColor: '#064635' }} 
                contentStyle={{paddingVertical:20}}
                onPress={() => {
                    navigation.navigate('Order',{
                        orderTotal:total,
                        orderPizzaName:pizzaNames,
                        orderPizzaIngredents:spices,
                        orderPizzaSize:sizeName
                    });
                }}
            >Continue to delivery</Button>
        }

    }


    return (
        <ScrollView>
                 <View style={styles.container}>
            <Text style={styles.heading}>Customize your order</Text>

            {/* pizza billing total */}

            <View style={styles.billing}>
                <Text style={styles.pizzaBillingTitle}>Pizza Total</Text>
                <Text style={styles.pizzaBillingValue}>NGN{total}</Text>
                <Text style={styles.pizzaBillingTitle}>{pizzaNames} pizza with these spices ({spices})</Text>
            </View>

            {/* select a pizza to show ingredients */}
            <ScrollView horizontal>
                {Object.values(pizzas).map(singlePizza => (
                    <TouchableHighlight
                        {...touchProps}
                        style={styles.selectedPizza}
                        onPress={() => {
                            setSelected(singlePizza.ingredients);
                            setPizzaNames(singlePizza.pizzaName);
                        }}
                    >
                        <Text style={styles.selectedTitle}>{singlePizza.pizzaName}</Text>
                    </TouchableHighlight>
                ))}
            </ScrollView>


            {/* ingredients based on selected pizza */}
            <View style={styles.pizzas}>
                {Object.values(selected).map(item => (
                    <TouchableOpacity
                        style={[styles.pizza, { marginRight: Math.round(Math.random() * 100), marginLeft: Math.round(Math.random() * 100), }]}
                        onPress={() => {
                            setSpices(spices + ',' + ' ' + item.ingreName);
                            setTotal(total + item.fee);
                        }}
                    >


                        <Text style={styles.pizzaTitle}>{item.ingreName}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* available sizes */}
            <View style={styles.sizes}>
                {Object.values(pizzaSizes).map(item => (
                    <TouchableOpacity
                        style={styles.sizeTouch}
                        onPress={() => {
                            setTotal(total + item.fee)
                            setSizeName(item.sizeName)
                        }}
                    >
                        <Text style={styles.sizeTitle}>{item.sizeName}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* continue to delivery button */}
            {ProccedToDelivery()}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    heading: {
        fontSize: 26,
        textAlign: 'center',
        color: '#519259',
        fontWeight: 'bold'
    },
    pizzas: {
        marginTop: 20,

    },
    pizza: {
        backgroundColor: '#FFBC80',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 50,

        marginBottom: 5
    },
    pizzaTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    selectedPizza: {
        backgroundColor: '#519259',
        marginRight: 5,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10
    },
    selectedTitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,

    },
    sizes: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    sizeTouch: {
        borderWidth: 1,
        borderColor: '#519259',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 10,
    },
    sizeTitle: {
        color: '#519259',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    billing: {
        backgroundColor: '#b8b7b7',
        paddingHorizontal: 10,
        paddingVertical: 14,
        marginBottom: 20,
        marginTop: 20,
        borderRadius: 10
    },
    pizzaBillingTitle: {
        color: 'gray',
        textAlign: 'center',
    },
    pizzaBillingValue: {
        fontSize: 38,
        textAlign: 'center'
    },

    btnNormal: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        height: 30,
        width: 100,
    },
    btnPress: {
        borderColor: 'blue',
        borderWidth: 1,
        height: 30,
        width: 100,
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    }
})