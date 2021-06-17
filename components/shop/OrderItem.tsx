import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import colors from "../../constant/colors";
import Card from "../../UI/Card";
import CartItem from "./../shop/CartItem";

const OrderItem = (props: any) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails(!showDetails)}
      />
      {showDetails && (
        <View style={styles.listItems}>
          {props.items.map((cartItem: any) => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 25,
    padding: 10,
    alignItems: "center",
  },

  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  totalAmount: {
    fontFamily: "Open-sans-Bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "Open-sans-Regular",
    color: "#888",
  },
  listItems: {
    width: "100%",
    flexDirection: "column",
  },
});

export default OrderItem;
