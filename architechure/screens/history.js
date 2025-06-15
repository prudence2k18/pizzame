import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Card, Button } from "react-native-paper";
import { Theme } from "../theme/Theme";
import { db } from "../../services/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { format } from "date-fns";

export function History({ navigation }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const ordersQuery = query(
          collection(db, "purchases"),
          orderBy("timestamp", "desc")
        );

        const unsubscribe = onSnapshot(ordersQuery, (querySnapshot) => {
          const ordersData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            date: format(new Date(doc.data().timestamp), "PPPpp"), 
          }));
          setOrders(ordersData);
          setLoading(false);
          setRefreshing(false);
        });

        return unsubscribe;
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setRefreshing(false);
      }
    };

    const unsubscribe = fetchOrders();
    return () => unsubscribe();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
  };

  const renderOrderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.orderHeader}>
          <Text style={styles.orderTitle}>{item.pizzaname}</Text>
          <Text style={styles.orderPrice}>₦{item.price?.toLocaleString()}</Text>
        </View>

        <View style={styles.orderDetails}>
          <Text style={styles.detailText}>Size: {item.size}</Text>
          <Text style={styles.detailText}>Ingredients: {item.ingredients}</Text>
          <Text style={styles.detailText}>Address: {item.address}</Text>
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Button
            mode="outlined"
            onPress={() =>
              navigation.navigate("Order", {
                total: item.price,
                pizzaName: item.pizzaname,
                ingredients: item.ingredients,
                size: item.size,
              })
            }
            style={styles.reorderButton}
            labelStyle={styles.reorderButtonText}
          >
            Reorder
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.ui.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading orders: {error}</Text>
        <Button
          mode="contained"
          onPress={handleRefresh}
          style={styles.retryButton}
        >
          Retry
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Order History</Text>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Theme.colors.ui.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders found</Text>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("Home")}
              style={styles.emptyButton}
            >
              Browse Pizzas
            </Button>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.bg.primary,
    paddingHorizontal: Theme.spacing.md,
  },
  screenTitle: {
    fontSize: Theme.fonts.size.h4,
    fontWeight: Theme.fonts.weight.bold,
    color: Theme.colors.text.primary,
    marginVertical: Theme.spacing.lg,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.lg,
  },
  errorText: {
    color: Theme.colors.ui.error,
    fontSize: Theme.fonts.size.body,
    marginBottom: Theme.spacing.md,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: Theme.colors.ui.primary,
  },
  listContent: {
    paddingBottom: Theme.spacing.xl,
  },
  card: {
    marginBottom: Theme.spacing.md,
    backgroundColor: Theme.colors.bg.secondary,
    borderRadius: Theme.sizes.borderRadius.md,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Theme.spacing.sm,
  },
  orderTitle: {
    fontSize: Theme.fonts.size.title,
    fontWeight: Theme.fonts.weight.bold,
    color: Theme.colors.text.primary,
    flex: 1,
  },
  orderPrice: {
    fontSize: Theme.fonts.size.title,
    fontWeight: Theme.fonts.weight.bold,
    color: Theme.colors.ui.primary,
  },
  orderDetails: {
    marginBottom: Theme.spacing.sm,
  },
  detailText: {
    fontSize: Theme.fonts.size.body,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.xs,
  },
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Theme.spacing.sm,
  },
  dateText: {
    fontSize: Theme.fonts.size.caption,
    color: Theme.colors.text.disabled,
  },
  reorderButton: {
    borderColor: Theme.colors.ui.primary,
  },
  reorderButtonText: {
    color: Theme.colors.ui.primary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.xl,
  },
  emptyText: {
    fontSize: Theme.fonts.size.title,
    color: Theme.colors.text.secondary,
    marginBottom: Theme.spacing.lg,
    textAlign: "center",
  },
  emptyButton: {
    backgroundColor: Theme.colors.ui.primary,
  },
});
