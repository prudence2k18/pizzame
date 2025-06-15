import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "react-native-paper";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Theme } from "../theme/Theme";
import { validateEmail, validatePhone } from "../utils/validation";

export function Order({ navigation, route }) {
  const { total, pizzaName, ingredients, size } = route.params;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    coords: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [form]);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!validateEmail(form.email)) newErrors.email = "Invalid email address";
    if (!validatePhone(form.phone)) newErrors.phone = "Invalid phone number";
    if (!form.address) newErrors.address = "Delivery address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("Checkout", {
        price: total,
        pizzaName,
        ingredients,
        size,
        fname: form.firstName,
        lname: form.lastName,
        email: form.email,
        phone: form.phone,
        lat: form.coords?.latitude || 0,
        lon: form.coords?.longitude || 0,
        address: form.address,
      });
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Place Your Order</Text>

        <View style={styles.formGroup}>
          <TextInput
            placeholder="First Name"
            style={[styles.input, errors.firstName && styles.inputError]}
            value={form.firstName}
            onChangeText={(text) => handleChange("firstName", text)}
          />
          {errors.firstName && (
            <Text style={styles.errorText}>{errors.firstName}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <TextInput
            placeholder="Last Name"
            style={[styles.input, errors.lastName && styles.inputError]}
            value={form.lastName}
            onChangeText={(text) => handleChange("lastName", text)}
          />
          {errors.lastName && (
            <Text style={styles.errorText}>{errors.lastName}</Text>
          )}
        </View>

        <View style={styles.formGroup}>
          <TextInput
            placeholder="Email Address"
            style={[styles.input, errors.email && styles.inputError]}
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.formGroup}>
          <TextInput
            placeholder="Phone Number"
            style={[styles.input, errors.phone && styles.inputError]}
            value={form.phone}
            onChangeText={(text) => handleChange("phone", text)}
            keyboardType="phone-pad"
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <GooglePlacesAutocomplete
            placeholder="Enter delivery address"
            styles={{
              textInput: [styles.input, errors.address && styles.inputError],
              listView: styles.listView,
              description: styles.description,
              row: styles.row,
            }}
            fetchDetails={true}
            query={{
              key: "",
              language: "en",
              components: "",
            }}
            onPress={(data, details = null) => {
              handleChange("address", data.description);
              handleChange("coords", details.geometry.location);
              setErrors((prev) => ({ ...prev, address: undefined }));
            }}
            onFail={(error) => console.error(error)}
            debounce={300}
          />
          {errors.address && (
            <Text style={styles.errorText}>{errors.address}</Text>
          )}
        </View>

        <Button
          mode="contained"
          loading={isLoading}
          disabled={isLoading}
          style={styles.submitButton}
          contentStyle={styles.buttonContent}
          onPress={handleSubmit}
        >
          Complete Your Order
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bg.primary,
  },
  scrollContainer: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.xl,
  },
  title: {
    fontSize: Theme.fonts.size.h4,
    fontWeight: Theme.fonts.weight.bold,
    color: Theme.colors.text.primary,
    textAlign: "center",
    marginBottom: Theme.spacing.lg,
  },
  formGroup: {
    marginBottom: Theme.spacing.md,
  },
  input: {
    backgroundColor: Theme.colors.bg.secondary,
    borderRadius: Theme.sizes.borderRadius.md,
    padding: Theme.spacing.sm,
    fontSize: Theme.fonts.size.body,
    color: Theme.colors.text.primary,
    borderWidth: 1,
    borderColor: Theme.colors.ui.disabled,
  },
  inputError: {
    borderColor: Theme.colors.ui.error,
  },
  errorText: {
    color: Theme.colors.ui.error,
    fontSize: Theme.fonts.size.caption,
    marginTop: Theme.spacing.xs,
  },
  sectionTitle: {
    fontSize: Theme.fonts.size.body,
    fontWeight: Theme.fonts.weight.medium,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.sm,
  },
  submitButton: {
    marginTop: Theme.spacing.lg,
    backgroundColor: Theme.colors.ui.primary,
    borderRadius: Theme.sizes.borderRadius.lg,
  },
  buttonContent: {
    height: Theme.sizes.buttonHeight,
  },
  listView: {
    backgroundColor: Theme.colors.bg.secondary,
    borderRadius: Theme.sizes.borderRadius.md,
    marginTop: 4,
  },
  description: {
    color: Theme.colors.text.primary,
  },
  row: {
    backgroundColor: Theme.colors.bg.secondary,
  },
});
