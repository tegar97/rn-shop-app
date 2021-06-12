import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import colors from "../constant/colors";
import ProductOverviewScreen from "../screen/Product/ProductOverviewScreen";

const ProductsNavigator = createStackNavigator(
  {
    ProductOverview: ProductOverviewScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
