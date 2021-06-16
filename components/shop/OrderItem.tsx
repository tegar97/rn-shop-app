import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import colors from "../../constant/colors";

const OrderItem = (props: any) => {
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        color={colors.primary}
        title="Show Details"
        onPress={() => console.log("")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "#ffff",
    margin: 25,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
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
});

export default OrderItem;
