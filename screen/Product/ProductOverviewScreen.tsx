import React from "react";
import { View, Text, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import rootReducer from "./../../store/reducers/product";
import { addToCart } from "./../../store/actions/Cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../UI/HeaderButtons";
const ProductOverviewScreen = (props: any) => {
  const products = useSelector(
    (state: any) => state?.products?.availableProduct
  );
  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => {
        return (
          <ProductItem
            image={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() =>
              props.navigation.navigate("ProductDetail", {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              })
            }
            onAddCart={() => dispatch(addToCart(itemData.item))}
          />
        );
      }}
    />
  );
};

ProductOverviewScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: "All Product",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("CartScreen");
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default ProductOverviewScreen;
