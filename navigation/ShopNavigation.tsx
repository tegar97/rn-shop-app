import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import colors from "../constant/colors";
import ProductDetailScreen from "../screen/Product/ProductDetailScreen";
import ProductOverviewScreen from "../screen/Product/ProductOverviewScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
  },
  {
    defaultNavigationOptions: {
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
    },
  }
);

export default createAppContainer(ProductsNavigator);
