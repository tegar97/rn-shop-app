import React, { useState, useCallback, useEffect } from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../../UI/HeaderButtons";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../../store/actions/Product";
const EditProduct = (props: any) => {
  const dispatch = useDispatch();

  const prodId = props.navigation.getParam("productId");
  const editedProduct = useSelector((state: any) =>
    state.products.userProduct.find((prod: any) => prod.id === prodId)
  );
  const [title, setTitle] = useState(editedProduct ? editedProduct.title : "");
  const [imageUrl, setimageUrl] = useState(
    editedProduct ? editedProduct.imageUrl : ""
  );
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct(prodId, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
    props.navigation.goBack();
  }, [dispatch, prodId, title, description, imageUrl]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => setTitle(text)}
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onEndEditing={() => console.log("onEditing")}
            onSubmitEditing={() => console.log("onSubmitEditing")}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image Url</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setimageUrl(text)}
          />
        </View>
        {editedProduct ? null : (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
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
