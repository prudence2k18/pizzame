import { useState } from "react";
import { View, Text, StyleSheet, Alert, ScrollView, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Theme } from "../theme/theme";
import { db } from "../../services/firebase";
import { addDoc, collection } from 'firebase/firestore';
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

const INITIAL_POSITION = {
  latitude: 9.150245524275425,
  longitude: 7.330573650504128,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02 * (Dimensions.get('window').width / Dimensions.get('window').height),
};

export function Checkout({ navigation, route }) {
  const {
    price,
    pizzaName,
    ingredients,
    size,
    fname,
    lname,
    email,
    phone,
    lat,
    lon,
    address
  } = route.params;

  let otherCharges = price * 0.015;
  if (price >= 2500) otherCharges += 100;
  if (otherCharges > 2000) otherCharges = 2000;
  
  const deliveryFee = 500;
  const total = price + deliveryFee + otherCharges;

  const animatedShadow = useAnimatedStyle(() => ({
    elevation: withSpring(5), 
    shadowColor: '#000',      
    shadowOffset: {
      width: 0,
      height: withSpring(10)
    },
    shadowOpacity: withSpring(0.2),
    shadowRadius: withSpring(3),
  }));

  const createOrder = async () => {
    try {
      const now = new Date();
      await addDoc(collection(db, 'purchases'), {
        address,
        email,
        firstname: fname,
        lastname: lname,
        phone,
        pizzaname: pizzaName,
        price: total,
        size,
        ingredients,
        timestamp: now.getTime(),
        location: { lat, lon }
      });

      Alert.alert(
        'Order Confirmation',
        'We have received your customized pizza order.',
        [{ text: 'Okay, Thanks', onPress: () => navigation.navigate('Home') }]
      );
    } catch (error) {
      console.error('Order failed:', error);
      Alert.alert('Error', 'Failed to place order. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Map Section */}
      <Animated.View style={[styles.addressView, animatedShadow]}>
        <MapView 
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            ...INITIAL_POSITION,
            latitude: lat,
            longitude: lon
          }}
        >
          <Marker coordinate={{ latitude: lat, longitude: lon }} title={address} />
        </MapView>
      </Animated.View>

      {/* Order Summary */}
      <View style={styles.orderSummary}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.summaryHeading}>Proceed to payment</Text>
          
          <View style={styles.details}>
            {[
              { label: 'Pizza name', value: pizzaName },
              { label: 'Item price', value: `₦${price.toLocaleString()}` },
              { label: 'Delivery fee', value: `₦${deliveryFee.toLocaleString()}` },
              { label: 'Other charges', value: `₦${otherCharges.toLocaleString()}` },
              { label: 'Total', value: `₦${total.toLocaleString()}` },
              { label: 'Full name', value: `${fname} ${lname}` },
              { label: 'Email', value: email },
              { label: 'Phone number', value: phone },
            ].map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.detailsText}>{item.label}</Text>
                <Text style={styles.detailsText}>{item.value}</Text>
              </View>
            ))}
          </View>

          <Button
            mode="contained"
            style={styles.orderButton}
            contentStyle={styles.buttonContent}
            onPress={createOrder}
          >
            Complete Your Order
          </Button>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bg.primary,
  },
  addressView: {
    flex: 1,
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
  },
  map: {
    height: '100%',
    width: Dimensions.get('window').width - 20,
  },
  orderSummary: {
    flex: 1,
    padding: 10,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  summaryHeading: {
    textAlign: 'center',
    fontSize: Theme.fonts.fontSize.h4,
    fontWeight: 'bold',
    marginVertical: 10,
    color: Theme.colors.text.primary,
  },
  details: {
    backgroundColor: Theme.colors.bg.secondary,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.ui.success,
  },
  detailsText: {
    fontSize: Theme.fonts.size.body,
    color: Theme.colors.text.secondary,
  },
  orderButton: {
    marginTop: 20,
    backgroundColor: Theme.colors.ui.primary,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});