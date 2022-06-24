import * as React from 'react';
import Log from './Login';
import News from './ny'
import Popular from './Popular'
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Becas from './BecasList';



function HomeScreen({ navigation }) {
    return (
      <ScrollView style={styles.Container}>
        <Text style={styles.title}>New York Times</Text>
        <News/>
        <Text style={styles.title}>Becas Populares</Text>
        <Popular/>
        <Becas/>
      </ScrollView>
    );
  }

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
      <Drawer.Navigator initialRouteName="Wombat news">
        <Drawer.Screen name="Wombat Becas" component={HomeScreen} />
        <Drawer.Screen name="Login" component={Log} />
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