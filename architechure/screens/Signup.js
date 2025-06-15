import { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { TextInput, Button, Text, HelperText } from "react-native-paper";
import { Theme } from "../theme/Theme";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { validateEmail, validatePassword } from "../utils/validation";

export function Signup({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(form.password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      navigation.navigate("Home");
    } catch (error) {
      let errorMessage = "Signup failed. Please try again.";
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already in use";
          break;
        case "auth/invalid-email":
          errorMessage = "Please enter a valid email";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters";
          break;
        default:
          console.error("Signup error:", error);
      }
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            mode="outlined"
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            error={!!errors.email}
            style={styles.input}
            theme={{
              colors: {
                primary: Theme.colors.ui.primary,
                background: Theme.colors.bg.primary,
              },
            }}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Password"
            mode="outlined"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry={secureTextEntry}
            autoComplete="password"
            textContentType="password"
            error={!!errors.password}
            style={styles.input}
            right={
              <TextInput.Icon
                name={secureTextEntry ? "eye-off" : "eye"}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
            theme={{
              colors: {
                primary: Theme.colors.ui.primary,
                background: Theme.colors.bg.primary,
              },
            }}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            label="Confirm Password"
            mode="outlined"
            value={form.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry={secureTextEntry}
            error={!!errors.confirmPassword}
            style={styles.input}
            theme={{
              colors: {
                primary: Theme.colors.ui.primary,
                background: Theme.colors.bg.primary,
              },
            }}
          />
          <HelperText type="error" visible={!!errors.confirmPassword}>
            {errors.confirmPassword}
          </HelperText>
        </View>

        {errors.submit && (
          <HelperText type="error" style={styles.submitError}>
            {errors.submit}
          </HelperText>
        )}

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={isLoading}
          disabled={isLoading}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Sign Up
        </Button>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Signin")}
            labelStyle={styles.linkText}
          >
            Sign In
          </Button>
        </View>
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
    flexGrow: 1,
    justifyContent: "center",
    padding: Theme.spacing.lg,
  },
  title: {
    fontSize: Theme.fonts.size.h3,
    fontWeight: Theme.fonts.weight.bold,
    color: Theme.colors.text.primary,
    textAlign: "center",
    marginBottom: Theme.spacing.xl,
  },
  inputContainer: {
    marginBottom: Theme.spacing.md,
  },
  input: {
    backgroundColor: Theme.colors.bg.primary,
  },
  button: {
    marginTop: Theme.spacing.md,
    backgroundColor: Theme.colors.ui.primary,
    borderRadius: Theme.sizes.borderRadius.md,
    paddingVertical: Theme.spacing.sm,
  },
  buttonLabel: {
    color: Theme.colors.text.onPrimary,
    fontSize: Theme.fonts.size.button,
    fontWeight: Theme.fonts.weight.bold,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: Theme.spacing.lg,
  },
  footerText: {
    color: Theme.colors.text.secondary,
    fontSize: Theme.fonts.size.body,
  },
  linkText: {
    color: Theme.colors.ui.primary,
    fontWeight: Theme.fonts.weight.bold,
  },
  submitError: {
    textAlign: "center",
    marginBottom: Theme.spacing.sm,
  },
});
