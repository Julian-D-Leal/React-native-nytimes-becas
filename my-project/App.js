import * as React from 'react';
import MyDrawer from './components/Home'
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './components/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
}
