import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { pizzas } from "../../assets/data/pizzas";
import { pizzaSizes } from "../../assets/data/pizzas";

export function Customize ({navigation,route}) {
    const [selected,setSelcted] = useState({});
    const [total,setTotal] = useState(0);
    const [pizzaNames, setPizzaNames] = useState('');
    const [spices, setSpices] = useState([]);
    const [sizeName, setSizeName] = useState('');
    
    function ProccedToDelivery () {
        if(total > 0){
            return <Button mode="outlined" color="white" 
            style={ {marginTop:20, backgroundColor:'#064635'}} contentStyle={{paddingVertical:20}}
            onPress={() =>{
                navigation.navigate('Order',{
                    orderTotal:total,
                    orderPizzaName:selectedPizza,
                    orderPizzaIngredents:spices,
                    orderPizzaSize:sizeName
                });
            }}
            >
            continue to delivery</Button>
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Customize Your Order</Text>

            {/* pizza billing total */}
            <View style={styles.billing}>
            <Text style={styles.pizzaBillingTitle}>Pizza total</Text>
            <Text style={styles.pizzaBillingValue}>NGN{total}</Text>
            <Text style={styles.pizzaBillingTitle}>{pizzaNames} with ingredients ({spices})</Text>
            </View>

            {/* select pizza to show ingredient */}
            <ScrollView horizontal>
                {Object.values(pizzas).map(singlePizza => (
                    <TouchableOpacity 
                    style={styles.selectedPizza}
                    onPress={() => {
                        setSelcted(singlePizza.ingredients);
                        setPizzaNames(singlePizza.pizzaName);
                    }}
                    >
                        <Text style={styles.selectedTitle}>
                            {singlePizza.pizzaName}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* ingredients based on selcted pizza */}
            <View style={styles.pizzas}>
                {Object.values(selected).map(item => (
                    <TouchableOpacity 
                    style={[styles.pizza,{marginRight:Math.round(Math.random() * 100), marginLeft:Math.round(Math.random() * 100)}]}
                    onPress={() => {
                        setSpices(spices + ' ' + item.ingreName,);
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
                    style={styles.sizesTouch}
                    onPress={() => {
                        setTotal(total + item.fee);
                    }}
                    >
                    <Text style={styles.sizesTitle}>{item.sizeName}</Text>
                </TouchableOpacity>
                ))}
            </View>

            {/* continue to delivery button */}
            {ProccedToDelivery()}
        </View>
    )
}

const styles =StyleSheet.create({
    container:{
        padding:20
    },
    heading:{
        fontSize:26,
        textAlign:'center',
        color:'#519259',
        fontWeight:'bold'
    },
    pizzas:{
        marginTop:20
    },
    pizza:{
        backgroundColor:'#FFBC80',
        paddingHorizontal:20,
        paddingVertical:12,
        borderRadius:50,
        marginBottom:5
    },
    pizzaTitle:{
        color:'#000',
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    selectedTitle:{
        color:'#fff'
    },
    selectedPizza:{
        backgroundColor:'#064635',
        marginRight:5,
        paddingHorizontal:10,
        paddingVertical:20,
        borderRadius:10,
        borderWidth:2,
        borderColor:'#519259'
    },
    selectedActivePizza:{

    },
    selectedActiveTitle:{

    },
    sizes:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    sizesTouch:{
        borderWidth:1,
        borderColor:'#519259',
        paddingVertical:8,
        paddingHorizontal:8,
        borderRadius:10
    },
    sizesTitle:{
        color:'#000',
        fontSize:18,
        fontWeight:'bold',
        textAlign:'center'
    },
    billing:{
        backgroundColor:'#cccccc',
        paddingHorizontal:12,
        paddingVertical:14,
        marginBottom:20,
        marginTop:20,
        borderRadius:10

    },
    pizzaBillingTitle:{
        color:'gray',
        textAlign:'center'
    },
    pizzaBillingValue:{
        fontSize:38,
        textAlign:'center'
    }
})