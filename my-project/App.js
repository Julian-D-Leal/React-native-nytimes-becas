import * as React from 'react';
import MyDrawer from './components/Home'
import { NavigationContainer} from '@react-navigation/native';
import {LogBox} from "react-native";
LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])

export default function App() {
  return (
    <NavigationContainer>
      
      <MyDrawer />
    </NavigationContainer>
  );
}
