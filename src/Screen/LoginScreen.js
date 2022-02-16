import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { StyleSheet, TextInput, View, Keyboard } from "react-native";
import FirebaseUtils from "../Utils/FirebaseUtils";
import { WP } from "../Utils/utils";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //SignUp or SignIn

  const [create, setCreate] = useState(false);

  const SignUp = () => {
    if (email && password) {
      FirebaseUtils.signUp(email, password).catch((e) => {
        console.log(e.message);
        alert("Something Went Wrong");
      });
    } else {
      alert("Fill The Fields");
    }
  };
  const SignIn = () => {
    if (email && password) {
      FirebaseUtils.signIn(email, password).catch((e) => {
        console.log(e.message);
        alert("Email/Password is Wrong");
      });
    } else {
      alert("Fill The Fields");
    }
  };
  const [secure, setSecure] = React.useState(true);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.Container}>
        {create ? (
          <Text style={styles.mainheading}>Register</Text>
        ) : (
          <Text style={styles.mainheading}>Log In</Text>
        )}
        <TextInput
          placeholder="Email"
          onChangeText={setEmail}
          style={styles.InputText}
          value={email}
        />
        <View style={styles.InputText2}>
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry={secure}
            style={{
              width: "80%",
              color: "black",
              fontWeight: "600",
              fontSize: 16,
            }}
          />
          {secure ? (
            <>
              <TouchableOpacity onPress={() => setSecure(false)}>
                <Text style={styles.ShowText}>Show</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity onPress={() => setSecure(true)}>
                <Text style={styles.ShowText}>Unshow</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {create ? (
          <>
            <TouchableOpacity style={styles.button} onPress={() => SignUp()}>
              <Text style={styles.buttontext}>Register</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity style={styles.QATextContainer}>
                <Text style={styles.QAText} onPress={() => setCreate(false)}>
                  Already have an account?
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={() => SignIn()}>
              <Text style={styles.buttontext}>Log In</Text>
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                width: "100%",
              }}
            >
              <TouchableOpacity style={styles.QATextContainer}>
                <Text style={styles.QAText} onPress={() => setCreate(true)}>
                  {"Don't have an account?"}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 30 : 20,
    backgroundColor: "#fff",
    padding: 40,
    justifyContent: "center",
  },
  InputText: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: Platform.OS === "ios" ? 14 : 13,
    paddingVertical: Platform.OS === "ios" ? 14 : 11,
    marginBottom: 13,
    borderRadius: 8,
    fontWeight: "600",
    fontSize: 15,
    borderColor: "#E2E2E2",
    borderWidth: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    color: "black",
  },
  InputText2: {
    backgroundColor: "#F0F0F0",
    paddingHorizontal: Platform.OS === "ios" ? 14 : 13,
    paddingVertical: Platform.OS === "ios" ? 14 : 0,
    marginBottom: 13,
    borderRadius: 8,
    fontWeight: "600",
    fontSize: 16,
    borderColor: "#E2E2E2",
    borderWidth: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: "#F05A22",
    fontWeight: "500",
    fontSize: 16,
  },
  mainheading: {
    color: "black",
    fontSize: WP(7),
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: Platform.OS === "ios" ? 13 : 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 11,
    marginBottom: 20,
    borderRadius: 25,
    fontWeight: "600",
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttontext: {
    fontWeight: "500",
    fontSize: Platform.OS === "ios" ? 20 : 20,
    color: "#fff",
  },
  QATextContainer: {
    alignItems: "center",
    borderColor: "black",
    borderBottomWidth: Platform.OS === "ios" ? 1 : 2,
  },
  QAText: {
    fontSize: Platform.OS === "ios" ? 15 : 16,
    fontWeight: "500",
  },
  ShowText: {
    color: "black",
    fontSize: WP(3.8),
    fontWeight: Platform.OS === "ios" ? "400" : "500",
  },
});
