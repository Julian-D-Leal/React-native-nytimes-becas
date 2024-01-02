/** @format */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./states/user.state";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('token', jsonValue);
  } catch (e) {
    console.log(e);
  }
};
const deleteData = async () => {
  try {
    await AsyncStorage.removeItem('token');   
  } catch (e) {
    console.log(e);
  }
};
async function getMyStringValue (){
  try {
    const datos = await AsyncStorage.getItem('token');
    if(datos !== null){
      console.log(JSON.parse(datos));
      return JSON.parse(datos);
    }
  } catch(e) {
    console.log(e);
  }
}

const authMiddleware = (store) => (next) => (action) => {
  if (userSlice.actions.login.match(action)) {
    storeData(action.payload);
  } else if (userSlice.actions.logout.match(action)) {
    deleteData();
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
