import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import { pizzas } from "../../assets/data/pizzas";
import { pizzaSizes } from "../../assets/data/pizzas";
import { Theme } from "../theme/Theme";

export function Customize({ navigation, route }) {
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [total, setTotal] = useState(0);
  const [selectedPizza, setSelectedPizza] = useState("");
  const [selectedIngredientsList, setSelectedIngredientsList] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");

  const handleIngredientSelect = (ingredient) => {
    setTotal(total + ingredient.fee);
    setSelectedIngredientsList([
      ...selectedIngredientsList,
      ingredient.ingreName,
    ]);
  };

  const handleSizeSelect = (size) => {
    const prevSize = pizzaSizes.find((s) => s.sizeName === selectedSize);
    const newTotal = prevSize
      ? total - prevSize.fee + size.fee
      : total + size.fee;

    setTotal(newTotal);
    setSelectedSize(size.sizeName);
  };

  const proceedToDelivery = () => {
    if (total <= 0) {
      Alert.alert(
        "Selection Required",
        "Please select a pizza and at least one ingredient"
      );
      return null;
    }

    return (
      <Button
        mode="contained"
        style={styles.continueButton}
        contentStyle={styles.buttonContent}
        onPress={() => {
          navigation.navigate("Order", {
            total,
            pizzaName: selectedPizza,
            ingredients: selectedIngredientsList.join(", "),
            size: selectedSize,
          });
        }}
      >
        Continue to delivery
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Customize Your Order</Text>

      {/* Pizza billing total */}
      <View style={styles.billingContainer}>
        <Text style={styles.billingTitle}>Pizza total</Text>
        <Text style={styles.billingAmount}>₦{total.toLocaleString()}</Text>
        {selectedPizza ? (
          <Text style={styles.billingDescription}>
            {selectedPizza} with {selectedIngredientsList.length} ingredients
          </Text>
        ) : null}
      </View>

      {/* Pizza selection */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.pizzaScroll}
      >
        {Object.values(pizzas).map((pizza) => (
          <TouchableOpacity
            key={pizza.pizzaName}
            style={[
              styles.pizzaOption,
              selectedPizza === pizza.pizzaName && styles.selectedPizzaOption,
            ]}
            onPress={() => {
              setSelectedIngredients(pizza.ingredients);
              setSelectedPizza(pizza.pizzaName);
            }}
          >
            <Text style={styles.pizzaOptionText}>{pizza.pizzaName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Ingredients selection */}
      <ScrollView style={styles.ingredientsContainer}>
        {Object.values(selectedIngredients).map((ingredient, index) => (
          <TouchableOpacity
            key={`${ingredient.ingreName}-${index}`}
            style={[
              styles.ingredientButton,
              selectedIngredientsList.includes(ingredient.ingreName) &&
                styles.selectedIngredientButton,
            ]}
            onPress={() => handleIngredientSelect(ingredient)}
          >
            <Text style={styles.ingredientText}>
              {ingredient.ingreName} (+₦{ingredient.fee.toLocaleString()})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Size selection */}
      <View style={styles.sizeContainer}>
        <Text style={styles.sizeTitle}>Select Size:</Text>
        <View style={styles.sizeOptions}>
          {Object.values(pizzaSizes).map((size) => (
            <TouchableOpacity
              key={size.sizeName}
              style={[
                styles.sizeButton,
                selectedSize === size.sizeName && styles.selectedSizeButton,
              ]}
              onPress={() => handleSizeSelect(size)}
            >
              <Text style={styles.sizeButtonText}>
                {size.sizeName} (+₦{size.fee.toLocaleString()})
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Continue button */}
      {proceedToDelivery()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Theme.colors.bg.primary,
  },
  heading: {
    fontSize: 26,
    textAlign: "center",
    color: Theme.colors.ui.primary,
    fontWeight: "bold",
    marginBottom: 20,
  },
  billingContainer: {
    backgroundColor: Theme.colors.bg.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  billingTitle: {
    color: Theme.colors.text.secondary,
    textAlign: "center",
    fontSize: Theme.fonts.size.body,
  },
  billingAmount: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    color: Theme.colors.text.primary,
  },
  billingDescription: {
    color: Theme.colors.text.secondary,
    textAlign: "center",
    fontSize: Theme.fonts.size.caption,
  },
  pizzaScroll: {
    paddingBottom: 10,
  },
  pizzaOption: {
    marginRight: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Theme.colors.ui.disabled,
  },
  selectedPizzaOption: {
    backgroundColor: Theme.colors.ui.primary,
  },
  pizzaOptionText: {
    color: Theme.colors.text.primary,
    fontWeight: "bold",
  },
  ingredientsContainer: {
    flex: 1,
    marginTop: 10,
  },
  ingredientButton: {
    backgroundColor: Theme.colors.ui.secondary,
    padding: 12,
    borderRadius: 25,
    marginBottom: 8,
    alignSelf: "flex-start",
  },
  selectedIngredientButton: {
    backgroundColor: Theme.colors.ui.primary,
  },
  ingredientText: {
    color: Theme.colors.text.primary,
    fontSize: Theme.fonts.size.body,
  },
  sizeContainer: {
    marginTop: 20,
  },
  sizeTitle: {
    fontSize: Theme.fonts.size.title,
    color: Theme.colors.text.primary,
    marginBottom: 10,
  },
  sizeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: Theme.colors.ui.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 10,
    minWidth: "30%",
  },
  selectedSizeButton: {
    backgroundColor: Theme.colors.ui.primary,
  },
  sizeButtonText: {
    color: Theme.colors.text.primary,
    textAlign: "center",
    fontSize: Theme.fonts.size.body,
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: Theme.colors.ui.primary,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
