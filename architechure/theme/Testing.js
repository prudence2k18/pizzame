import { View, Text, StyleSheet, ScrollView } from "react-native";

export function Testing () {
    return (
        <View style={Styles.container}>
            <ScrollView>
            <View style={[Styles.item, {backgroundColor:'red'}]}></View>
            <View style={[Styles.item, Styles.green, {backgroundColor:'green'}]}></View>
            <View style={[Styles.item, Styles.blue, {backgroundColor:'blue'}]}></View>
            <View style={Styles.big}></View>
            <View style={Styles.big}></View>
            </ScrollView>
        </View>
    )
}

const Styles = StyleSheet.create ({
    container:{
        backgroundColor:'skyblue',
        flex:1,
        padding:10,
    },

    item:{
        width:120,
        height:120,
        borderWidth:1,
    },

    big:{
        height:600,
        width:'100%',
        backgroundColor:'gray'
    },

    green:{
        position:'relative',
        left:120
    },

    blue:{
        position:'relative',
        left:120,
        bottom:240,
    }
})