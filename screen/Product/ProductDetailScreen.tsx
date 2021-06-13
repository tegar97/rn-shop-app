import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import colors from "../../constant/colors";
import { addToCart } from "./../../store/actions/Cart";
const ProductDetailScreen = (props: any) => {
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector((state: any) =>
    state?.products?.availableProduct.find((prod: any) => prod.id === productId)
  );
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.action}>
        <Button
          color={colors.primary}
          title="Add To Cart"
          onPress={() => dispatch(cartActions.addToCart(selectedProduct))}
        />
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",

    marginVertical: 20,
    fontFamily: "Open-sans-Regular",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Open-sans-Regular",
  },
  action: {
    marginVertical: 10,
    alignItems: "center",
  },
});

ProductDetailScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: navData.navigation.getParam("productTitle"),
  };
};
export default ProductDetailScreen;
