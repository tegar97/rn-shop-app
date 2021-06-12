import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import rootReducer from "./../../reducers/product";

const ProductOverviewScreen: React.FC = () => {
  const products = useSelector(
    (state: any) => state?.products?.availableProduct
  );

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
            onViewDetail={() => console.log("yo")}
          />
        );
      }}
    />
  );
};
export default ProductOverviewScreen;
