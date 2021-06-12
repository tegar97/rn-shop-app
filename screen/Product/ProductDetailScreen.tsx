import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ProductDetailScreen = (props: any) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state: any) =>
    state?.products?.availableProduct.find((prod: any) => prod.id === productId)
  );

  return (
    <View>
      <Text>Product Detail Screen</Text>
    </View>
  );
};

ProductDetailScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};
export default ProductDetailScreen;
