import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import productReducer from "./store/reducers/product";
import ShopNavigation from "./navigation/ShopNavigation";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { composeWithDevTools } from "redux-devtools-extension";
import cartReducer from "./store/reducers/cart";
import OrderReducer from "./store/reducers/Orders";
const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: OrderReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

let customFonts = {
  "Open-sans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  "Open-sans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
};
export default function App() {
  const [fontsLoad, setFontLoad] = useState(false);

  useEffect(() => {
    async function loadFont() {
      setFontLoad(false);
      await Font.loadAsync(customFonts);
      setFontLoad(true);
    }
    loadFont();
  }, []);

  if (fontsLoad) {
    return (
      <Provider store={store}>
        <ShopNavigation />
      </Provider>
    );
  } else {
    return <AppLoading />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
