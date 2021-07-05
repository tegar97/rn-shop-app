import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Platform,
} from "react-native";
import colors from "../../constant/colors";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import { useDispatch } from "react-redux";
import { signup, login } from "./../../store/actions/auth";

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
function AuthScreen() {
  const dispatch = useDispatch();
  const [isSignUp, setIsSignup] = useState(false);

  const [FormState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });
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
  const authHandler = () => {
    let actions;
    if (isSignUp) {
      actions = signup(
        FormState.inputValues.email,
        FormState.inputValues.password
      );
    } else {
      console.log("login");
      actions = login(
        FormState.inputValues.email,
        FormState.inputValues.password
      );
    }

    dispatch(actions);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainter}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-Adress"
              required
              email
              autoCapatalize="none"
              errorText="Please Enter A valid email adress."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapatalize="none"
              errorText="Please Enter A valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              title={isSignUp ? "Sign Up" : "Login"}
              color={colors.primary}
              onPress={authHandler}
            />
            <Button
              title={isSignUp ? "Switch To Login" : "Switch To Sign Up"}
              color={colors.accent}
              onPress={() => {
                setIsSignup((prevState) => !prevState);
              }}
            />
          </View>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

AuthScreen.naviationOptions = {
  headerTitle: "Authentitance",
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainter: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});
export default AuthScreen;
