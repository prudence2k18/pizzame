import { onSnapshot } from "firebase/firestore";
import { useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, Image } from "react-native";
// import { db, collection, onSnapshot } from "../../Services/Firebase";

export function History () {
    useEffect(() => {
        onSnapshot(doc(db,'purchases','10KYs9w9jzJOnBYY2T2r'),(doc) => {
            console.log("Current data: ", doc.data());
        })
    },[])

    return (
        <ScrollView style={Styles.container}>

            <Text style={Styles.Header}>History</Text>

            <View style={Styles.setcover}>
                <TouchableOpacity style={Styles.set}>
                    <Text style={Styles.t1}>Date:   25/07/2022</Text>
                    <Text style={Styles.t1}>Quantity:   3</Text>
                    <Text style={Styles.t1}>Price:   7600</Text>
                    <View>
                        <Text style={Styles.t1}>Status:   success</Text>
                        <Image />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.set}>
                    <Text style={Styles.t1}>Date:   25/07/2022</Text>
                    <Text style={Styles.t1}>Quantity:   3</Text>
                    <Text style={Styles.t1}>Price:   7600</Text>
                    <Text style={Styles.t1}>Status:   success</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.set}>
                    <Text style={Styles.t1}>Date:   25/07/2022</Text>
                    <Text style={Styles.t1}>Quantity:   3</Text>
                    <Text style={Styles.t1}>Price:   7600</Text>
                    <Text style={Styles.t1}>Status:   success</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.set}>
                    <Text style={Styles.t1}>Date:   25/07/2022</Text>
                    <Text style={Styles.t1}>Quantity:   3</Text>
                    <Text style={Styles.t1}>Price:   7600</Text>
                    <Text style={Styles.t1}>Status:   success</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.set}>
                    <Text style={Styles.t1}>Date:   25/07/2022</Text>
                    <Text style={Styles.t1}>Quantity:   3</Text>
                    <Text style={Styles.t1}>Price:   7600</Text>
                    <Text style={Styles.t1}>Status:   success</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.set}>
                    <Text style={Styles.t1}>Date:   25/07/2022</Text>
                    <Text style={Styles.t1}>Quantity:   3</Text>
                    <Text style={Styles.t1}>Price:   7600</Text>
                    <Text style={Styles.t1}>Status:   success</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.set}>
                    <Text style={Styles.t1}>Date:   25/07/2022</Text>
                    <Text style={Styles.t1}>Quantity:   3</Text>
                    <Text style={Styles.t1}>Price:   7600</Text>
                    <Text style={Styles.t1}>Status:   success</Text>
                </TouchableOpacity>

                <TouchableOpacity style={Styles.set}>
                    <Text style={Styles.t1}>Date:   25/07/2022</Text>
                    <Text style={Styles.t1}>Quantity:   3</Text>
                    <Text style={Styles.t1}>Price:   7600</Text>
                    <Text style={Styles.t1}>Status:   success</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#cccccc'
    },

    Header:{
        textAlign:'center',
        fontSize:26,
        fontWeight:'bold'
        
    },

    setcover:{
        alignItems:'center',
    },

    set:{
        borderRadius:15,
        borderColor:'#000',
        borderWidth:2,
        margin:20,
        paddingHorizontal:200,
        backgroundColor:'#FF9F45'
    },

    t1:{
        fontSize:16,
        fontWeight:'bold'
    }
})