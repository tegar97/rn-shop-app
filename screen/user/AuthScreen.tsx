import { LinearGradient } from "expo-linear-gradient";
import React from "react";
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

function AuthScreen() {
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
              errorMessage="Please Enter A valid email adress."
              onInputChange={() => {}}
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
              errorMessage="Please Enter A valid password."
              onInputChange={() => {}}
              initialValue=""
            />
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button title="Login" color={colors.primary} onPress={() => {}} />
            <Button
              title="Switch To Register"
              color={colors.accent}
              onPress={() => {}}
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
