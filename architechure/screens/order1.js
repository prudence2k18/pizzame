// import { useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView,Alert } from "react-native";
// import { Button } from "react-native-paper";
// import { Theme } from "../theme/theme";
// import { db } from "../../services/firebase";
// import { setDoc, doc } from "firebase/firestore"

// // export function Order (navigation,route){
//     const [firstName,setFirstName] = useState('');
//     const [lastName,setLastName] = useState('');
//     const [email,setEmail] = useState('');
//     const [phone,setPhone] = useState('');
//     const [address,setAddress] = useState('');

//     const {orderTotal,
//         orderPizzaName,
//         orderPizzaIngredents,
//         orderPizzaSize
//     } = route.params;

//     function create () {
//         const now = new Date();
//         const nowTimestamp =now.getTime();

//         setDoc(doc(db, 'purchases','10KYs9w9jzJOnBYY2T2r'),{
//             address:address,
//             email:email,
//             firstname:firstName,
//             lastname:lastName,
//             phone:phone,
//             pizzaname:orderPizzaName,
//             price:orderTotal,
//             size:orderPizzaSize,
//             timestamp:nowTimestamp
            
//         })
//         //
//     }

//     return (
//         <View style={styles.container}>
//             <View style={styles.container}>
//             {/* show customized pizza info here  */}
//             <View style={styles.infoCont}>
//                 <View >
//                     <Image style={styles.img} source={require('')} />
//                 </View>

//                 <View style={styles.pizzaInfo}>
//                     <Text style={styles.pizzameName}></Text>
//                     <Text style={styles.pizzameSpices}></Text>
//                 </View>

//                 <View style={styles.billSect}>
//                     <Text style={styles.bill}></Text>
//                 </View>

//                 <View style={styles.sizeSect}>
//                     <Text style={styles.sizes}></Text>
//                 </View>
//             </View>

//             {/* first name, last name, phone, email, address */}
            
//                 <View style={styles.delivery}>
//                     <Text style={styles.heading}>Order {orderPizzaName} pizza</Text>
//                     <TextInput keyboardType='default' placeholder="first name" style={styles.input}
//                         onChangeText={(fname) => { setFirstName(fname) }} />
//                     <TextInput keyboardType='default' placeholder="last name" style={styles.input}
//                         onChangeText={(lname) => { setLastName(lname) }} />
//                     <TextInput keyboardType='email-address' placeholder="email adress" style={styles.input}
//                         onChangeText={(email) => { setEmail(email) }} />
//                     <TextInput keyboardType='numeric' placeholder="phone number" style={styles.input}
//                         onChangeText={(phone) => { setPhone(phone) }} />
//                     <TextInput keyboardType='default' placeholder="Address" style={styles.input}
//                         onChangeText={(phone) => { setAddress(phone) }} />
//                 </View>

            


//             <Button mode='outlined' color='white'
//                 style={{ marginTop: 20, backgroundColor: Theme.colors.ui.primary }} contentStyle={{ paddingVertical: 20 }}
//                 onPress={create}
//             >Complete Order


//             </Button>



//         </View>
    

//             {/* show customized pizza info here */}
//             {/* first name, last name, phone, email, address (keybored type multiline)*/}


//             <Button 
//                 mode="outlined" 
//                 color="white" 
//                 style={ {marginTop:20, backgroundColor:'#064635'}} 
//                 contentStyle={{paddingVertical:20}}

//                 onPress={create}
//             >
//             continue to delivery</Button>
//         </View>
//     )
// }

// const styles =StyleSheet.create({
//     container:{
//         padding:20
//     }
// })