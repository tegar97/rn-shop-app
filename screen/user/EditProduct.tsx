import React, { useState, useCallback, useEffect, useReducer } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../UI/HeaderButtons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../../store/actions/Product";
import Input from "./../../UI/Input";
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";
const formReducer = (state: any, action: any) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};
const EditProduct = (props: any) => {
  const dispatch = useDispatch();

  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state: any) =>
    state.products.userProduct.find((prod: any) => prod.id === prodId)
  );

  const [FormState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : "",
      imageUrl: editedProduct ? editedProduct.imageUrl : "",
      description: editedProduct ? editedProduct.description : "",
      price: "",
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      description: editedProduct ? true : false,
      price: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!FormState.formIsValid) {
      Alert.alert("Wrong Input!", "Please check the errors in the form", [
        { text: "OKAY" },
      ]);
    }
    if (editedProduct) {
      dispatch(
        updateProduct(
          prodId,
          FormState.inputValues.title,
          FormState.inputValues.description,
          FormState.inputValues.imageUrl
        )
      );
    } else {
      dispatch(
        createProduct(
          FormState.inputValues.title,
          FormState.inputValues.description,
          FormState.inputValues.imageUrl,
          +FormState.inputValues.price
        )
      );
    }
    props.navigation.goBack();
  }, [dispatch, prodId, FormState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier: any, inputValue: any, inputValidity: any) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <Input
          id="title"
          label="Title"
          errorText="Please enter a valid title!"
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.title : ""}
          initiallyValid={!!editedProduct}
          required
        />
        <Input
          id="imageUrl"
          label="Image Url"
          errorText="Please Enter a valid image url!"
          keyboardType="default"
          returnKeyType="next"
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.imageUrl : ""}
          initialValid={!!editedProduct}
          required
        />

        {editedProduct ? null : (
          <Input
            id="price"
            label="Price"
            errorText="Please Enter a valid Price!"
            keyboardType="decimal-pad"
            returnKeyType="next"
            required
            onInputChange={inputChangeHandler}
            min={0.1}
          />
        )}
        <Input
          id="description"
          label="Description"
          errorText="Please Enter a valid description!"
          keyboardType="default"
          returnKeyType="next"
          multiline
          numberOfLines={3}
          onInputChange={inputChangeHandler}
          initialValue={editedProduct ? editedProduct.description : ""}
          initialValid={!!editedProduct}
          required
        />
      </View>
    </ScrollView>
  );
};
EditProduct.navigationOptions = (navData: any) => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: navData.navigation.getParam("productId")
      ? "Edit Product"
      : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={
            Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          }
          onPress={submitFn}
        />
      </HeaderButtons>
    ),
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "Open-sans-Bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
export default EditProduct;
