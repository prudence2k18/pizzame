import { Alert, View } from "react-native";
import { Paystack } from "react-native-paystack-webview";

export function Pay({navigation,route}){
    const {price,email,phone} =route.params;

    return (
        <View style={{ flex: 1 }}>
      <Paystack  
        paystackKey="your-public-key-here"
        amount={price}
        billingEmail={email}
        activityIndicatorColor="green"
        onCancel={(e) => {
          navigation.navigate('Checkout')
        }}
        onSuccess={(res) => {
          Alert.alert(
            'Payment Status',
            `Your Payment of ${price} was successful`,
            [{text:'return to Customize',onPress:navigation.navigate('customize')}]
          )
        }}
        autoStart={true}
      />
    </View>
    )
}