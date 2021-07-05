import React, { useEffect } from "react";
import { View, Text, FlatList, Platform, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import rootReducer from "./../../store/reducers/product";
import { addToCart } from "./../../store/actions/Cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../UI/HeaderButtons";
import colors from "../../constant/colors";
import { fetchProducts } from "../../store/actions/Product";

const ProductOverviewScreen = (props: any) => {
  const products = useSelector(
    (state: any) => state?.products?.availableProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const selectItemHandler = (id: any, title: any) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };

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
            onSelect={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          >
            <Button
              color={colors.primary}
              title="View Details"
              onPress={() => {
                selectItemHandler(itemData.item.id, itemData.item.title);
              }}
            />
            <Button
              color={colors.primary}
              title="To Cart"
              onPress={() => dispatch(addToCart(itemData.item))}
            />
          </ProductItem>
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
