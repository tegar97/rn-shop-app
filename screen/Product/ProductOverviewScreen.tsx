import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import rootReducer from "./../../store/reducers/product";
import { addToCart } from "./../../store/actions/Cart";
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
            onAddCart={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        );
      }}
    />
  );
};
export default ProductOverviewScreen;
