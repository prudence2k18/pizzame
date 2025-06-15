import { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { Theme } from "../theme/Theme";
import { validateEmail, validatePhone } from "../utils/validation";

export function Popular({ route, navigation }) {
  const { pizzaImg, pizzaName, pizzaRating, pizzaPrice } = route.params;
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(pizzaRating);
    const hasHalfStar = pizzaRating % 1 !== 0;

    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={faStar}
          color="#FFD700"
          size={20}
          style={styles.starIcon}
        />
      );
    }

    // Half star
    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          color="#FFD700"
          size={20}
          style={styles.starIcon}
        />
      );
    }

    // Empty stars
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          color="#D3D3D3"
          size={20}
          style={styles.starIcon}
        />
      );
    }

    return (
      <View style={styles.ratingContainer}>
        {stars}
        <Text style={styles.ratingText}>({pizzaRating.toFixed(1)})</Text>
      </View>
    );
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!form.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigation.navigate("Order", {
        total: pizzaPrice,
        pizzaName: pizzaName,
        ingredients: "Standard ingredients",
        size: "Medium",
      });
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.pizzaDetails}>
        <Image source={{ uri: pizzaImg }} style={styles.pizzaImage} />
        <View style={styles.detailsText}>
          <Text style={styles.pizzaName}>{pizzaName}</Text>
          {renderStars()}
          <Text style={styles.pizzaPrice}>₦{pizzaPrice.toLocaleString()}</Text>
        </View>
      </View>

      <View style={styles.orderForm}>
        <Text style={styles.sectionTitle}>Delivery Information</Text>

        <TextInput
          label="First Name"
          mode="outlined"
          value={form.firstName}
          onChangeText={(text) => handleChange("firstName", text)}
          error={!!errors.firstName}
          style={styles.input}
          theme={{ colors: { primary: Theme.colors.ui.primary } }}
        />
        {errors.firstName && (
          <Text style={styles.errorText}>{errors.firstName}</Text>
        )}

        <TextInput
          label="Last Name"
          mode="outlined"
          value={form.lastName}
          onChangeText={(text) => handleChange("lastName", text)}
          error={!!errors.lastName}
          style={styles.input}
          theme={{ colors: { primary: Theme.colors.ui.primary } }}
        />
        {errors.lastName && (
          <Text style={styles.errorText}>{errors.lastName}</Text>
        )}

        <TextInput
          label="Email"
          mode="outlined"
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!errors.email}
          style={styles.input}
          theme={{ colors: { primary: Theme.colors.ui.primary } }}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

        <TextInput
          label="Phone Number"
          mode="outlined"
          value={form.phone}
          onChangeText={(text) => handleChange("phone", text)}
          keyboardType="phone-pad"
          error={!!errors.phone}
          style={styles.input}
          theme={{ colors: { primary: Theme.colors.ui.primary } }}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

        <Button
          mode="contained"
          onPress={handleOrder}
          loading={isSubmitting}
          disabled={isSubmitting}
          style={styles.orderButton}
          labelStyle={styles.orderButtonText}
        >
          Order Now
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.bg.primary,
  },
  pizzaDetails: {
    flexDirection: "row",
    marginBottom: Theme.spacing.xl,
    backgroundColor: Theme.colors.bg.secondary,
    borderRadius: Theme.sizes.borderRadius.md,
    padding: Theme.spacing.md,
    alignItems: "center",
  },
  pizzaImage: {
    width: 120,
    height: 120,
    borderRadius: Theme.sizes.borderRadius.sm,
  },
  detailsText: {
    flex: 1,
    marginLeft: Theme.spacing.md,
  },
  pizzaName: {
    fontSize: Theme.fonts.size.h5,
    fontWeight: Theme.fonts.weight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.xs,
  },
  pizzaPrice: {
    fontSize: Theme.fonts.size.title,
    fontWeight: Theme.fonts.weight.bold,
    color: Theme.colors.ui.primary,
    marginTop: Theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    marginRight: 2,
  },
  ratingText: {
    marginLeft: Theme.spacing.sm,
    color: Theme.colors.text.secondary,
  },
  orderForm: {
    marginTop: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.fonts.size.title,
    fontWeight: Theme.fonts.weight.bold,
    color: Theme.colors.text.primary,
    marginBottom: Theme.spacing.lg,
  },
  input: {
    backgroundColor: Theme.colors.bg.primary,
    marginBottom: Theme.spacing.sm,
  },
  errorText: {
    color: Theme.colors.ui.error,
    fontSize: Theme.fonts.size.caption,
    marginBottom: Theme.spacing.md,
    marginTop: -Theme.spacing.sm,
  },
  orderButton: {
    marginTop: Theme.spacing.lg,
    backgroundColor: Theme.colors.ui.primary,
    borderRadius: Theme.sizes.borderRadius.md,
    paddingVertical: Theme.spacing.sm,
  },
  orderButtonText: {
    color: Theme.colors.text.onPrimary,
    fontSize: Theme.fonts.size.button,
    fontWeight: Theme.fonts.weight.bold,
  },
});
