import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import colors from "../../constant/colors";

const CartScreen: React.FC = () => {
  const cartTotalAmout = useSelector((state: any) => state.cart.totalAmout);
  const cartItems = useSelector((state: any) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return transformedCartItems;
  });
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total :{" "}
          <Text style={styles.amount}>
            ${cartTotalAmout == null ? "" : cartTotalAmout.toFixed(2)}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={colors.primary}
          onPress={() => console.log("Ping Pong")}
          disabled={cartItems.length === 0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#ffff",
  },
  summaryText: {
    fontFamily: "Open-sans-Bold",
    fontSize: 18,
  },
  amount: {
    color: colors.primary,
  },
});
export default CartScreen;
