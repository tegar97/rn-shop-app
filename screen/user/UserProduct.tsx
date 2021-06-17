import React from "react";
import { FlatList, Platform } from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../UI/HeaderButtons";
import ProductItem from "../../components/shop/ProductItem";
const UserProductScreen = () => {
  const usersProducts = useSelector((state: any) => state.products.userProduct);
  return (
    <FlatList
      data={usersProducts}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {}}
          onAddCart={() => {}}
        />
      )}
    />
  );
};

UserProductScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: "Your Products",
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
  };
};
export default UserProductScreen;
