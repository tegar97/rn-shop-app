import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import colors from "../constant/colors";
import CartScreen from "../screen/Product/CartScreen";
import OrderScreen from "../screen/Product/OrderScreen";
import ProductDetailScreen from "../screen/Product/ProductDetailScreen";
import ProductOverviewScreen from "../screen/Product/ProductOverviewScreen";
import { createDrawerNavigator } from "react-navigation-drawer";

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
    defaultNavigationOptions: defaultNavOptions,
  }
);

const OrdersNavigatior = createStackNavigator(
  {
    Orders: OrderScreen,
  },
  {
    defaultNavigationOptions: defaultNavOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigatior,
  },
  {
    contentOptions: {
      activeTintColor: colors.primary,
    },
  }
);
export default createAppContainer(ShopNavigator);
