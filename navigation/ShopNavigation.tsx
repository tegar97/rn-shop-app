import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import colors from "../constant/colors";
import CartScreen from "../screen/Product/CartScreen";
import OrderScreen from "../screen/Product/OrderScreen";
import ProductDetailScreen from "../screen/Product/ProductDetailScreen";
import ProductOverviewScreen from "../screen/Product/ProductOverviewScreen";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import UserProductScreen from "../screen/user/UserProduct";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "Open-sans-Bold",
  },
  headerBackTitleStyle: {
    fontFamily: "Open-sans-Bold",
  },

  headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
};
const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    CartScreen: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (DrawerConfig: any) => (
        <Ionicons
          title="Menu"
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={DrawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigatior = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (DrawerConfig: any) => (
        <Ionicons
          title="Menu"
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={DrawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (DrawerConfig: any) => (
        <Ionicons
          title="Menu"
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={DrawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigatior,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
