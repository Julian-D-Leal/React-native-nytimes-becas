/** @format */

import React, { useState} from "react";
import NavigationBar from "react-native-navbar";
import { useDispatch, useSelector } from "react-redux";
import {
  ScrollView,
  Button,
  TextInput,
  View,
  StyleSheet,
  Text
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Admin from "./DashBoard";
import { login, logout } from "./redux/states/user.state";
import axios from "axios";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);
  const onLogOut = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (state.token) {
      config.headers["Authorization"] = `Token ${state.token}`;
    }
    await axios
      .post(
        "https://restframeworkbecasandlogin.herokuapp.com/becas/logout/",
        null,
        config
      )
      .then((response) => {
        dispatch(logout());
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  
  const onLogin = async (username, password) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });
    await axios
      .post(
        "https://restframeworkbecasandlogin.herokuapp.com/becas/login/",
        body,
        config
      )
      .then((response) => {
        dispatch(login(response.data));
      })
      .catch((err) => {
        alert("Credenciales incorrectas");
        console.log(err.response.data);
      });
  };

  console.log(state);
  //const prueba = AsyncStorage.getAllKeys()
  //console.log(prueba)
  const rightButtonConfig = {
    title: "Cerrar sesión",
    handler: () => onLogOut(),
    tintColor: "red",
  };

  const navbar = () => {
    return {
      title: `Bienvenido ${state.user.username}`,
      disabled: true,
      tintColor: "black",
      accessible: false,
    };
  };

  return (
    <React.Fragment>
      <ScrollView>
        <View>
          {!state.isAuthenticated ? (
            <View style={styles.container}>
              <View>
                <Text style={styles.title}>Inicio de sesion</Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  placeholder={"Username"}
                  style={styles.input}
                />
                <TextInput
                  value={password}
                  onChangeText={setPass}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  style={styles.input}
                />
              </View>
              <View style={{ marginBottom: 10 }}>
                <Button
                  title={"Login"}
                  onPress={() => onLogin(username, password)}
                />
              </View>
              <View>
                <Button
                  title={"Regresar"}
                  onPress={() => navigation.goBack()}
                />
              </View>
            </View>
          ) : (
            <View>
              <NavigationBar
                leftButton={navbar()}
                rightButton={rightButtonConfig}
              />
              <Admin />
            </View>
          )}
        </View>
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 200,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  title: {
    marginBottom: 30,
    fontSize: 25,
    fontFamily: "Roboto",
  },
  buttonClose: {
    backgroundColor: "#ff110c",
    width: 150,
    marginLeft: 240,
    alignItems: "center",
    paddingTop: 5,
    borderRadius: 15,
    height: 35,
  },
  buttonAdd: {
    backgroundColor: "#74c468",
    width: 150,
    alignItems: "center",
    paddingTop: 5,
    borderRadius: 15,
    height: 35,
    marginLeft: 3,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 15,
  },
});
