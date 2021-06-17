import React from "react";
import { FlatList, Platform, Button, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../UI/HeaderButtons";
import ProductItem from "../../components/shop/ProductItem";
import colors from "../../constant/colors";
import { deleteProduct } from "../../store/actions/Product";
const UserProductScreen = (props: any) => {
  const dispatch = useDispatch();
  const selectItemHandler = (id: any, title: any) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };
  const editProductHandler = (id: any) => {
    props.navigation.navigate("EditProduct", { productId: id });
  };
  const deleteHandler = (id: any) => {
    Alert.alert("Are you sure ", "Do you really want to delete this item ?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(id)),
      },
    ]);
  };
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
        >
          <Button
            color={colors.primary}
            title="Edit"
            onPress={() => editProductHandler(itemData.item.id)}
          />
          <Button
            color={colors.primary}
            title="Delete"
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditProduct");
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default UserProductScreen;
