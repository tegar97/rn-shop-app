import React from "react";

import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "./../constant/colors";
import { Platform } from "react-native";
const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === "android" ? "white" : "red"}
    />
  );
};

export default CustomHeaderButton;
