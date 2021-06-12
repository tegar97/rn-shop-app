import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
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
        return <Text>{itemData.item.title}</Text>;
      }}
    />
  );
};
export default ProductOverviewScreen;
