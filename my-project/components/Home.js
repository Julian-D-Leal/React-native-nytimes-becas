import * as React from 'react';
import Login from './Login';
import News from './ny'
import Popular from './Popular'
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { Text, StyleSheet, ScrollView, View} from 'react-native';
import Becas from './BecasList';
import NavigationBar from "react-native-navbar";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "./redux/states/user.state";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomeScreen({ navigation }) {
    const state = useSelector(state => state.user);
    const dispatch = useDispatch();
    const rightButtonConfig = {
      title: "Cerrar sesión",
      handler: () => onLogOut(),
      tintColor: "red",
    };
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
          alert("error");
          console.log(err.response.data);
        });
    }; 
    const navbar = () => {
      return { title: `Bienvenido ${state.user.username}`, disabled: true, tintColor: "black", accessible: false };	
    };

    return (
        <React.Fragment>
        {state.isAuthenticated 
        &&(
            <NavigationBar leftButton={navbar()} rightButton={rightButtonConfig} />
          )
        }
        <ScrollView style={styles.Container}>
          <View>
        <Text style={styles.title}>New York Times</Text>
        <News/>
        <Text style={styles.title}>Becas Populares</Text>
        <Popular/>
        <Becas/>
        </View>
        </ScrollView>
      </React.Fragment>
    );
  }

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    const state = useSelector(state => state.user);
    const nombre =
      !state.isAuthenticated ? "Login" : "Administrar" ;
    return (
      <Drawer.Navigator initialRouteName={nombre}>
        <Drawer.Screen name="Wombat Becas" component={HomeScreen} />
        <Drawer.Screen name={nombre} component={Login} />
      </Drawer.Navigator>
    );
  }
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    marginTop: 10,
    fontWeight: "600",
    marginLeft: 88
  },
  Container:{
    flex: 1,
    padding: 40
  }
});