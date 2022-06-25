import React,{useState, useEffect} from 'react';
import { ScrollView, Button, TextInput, View, StyleSheet, Text, Pressable } from 'react-native';
import axios from 'axios';
import Admin from './DashBoard'
import Constants from '../path'


export default function Login({ navigation }) {

  const [user, setUser] = useState([])
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [active, setActive] = useState(false)
  

  const Users = () => {
    axios
    .get("http://"+Constants.RUTA+"/becas/users/")
    .then(res => setUser(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    Users();
  }, [])

  const onLogin = () => {
    let int = user.filter(
      (item) => item.username === username && item.password === pass)
    if(int.length === 1){
      setActive(true);
      alert('Credenciales correctas');
    }else alert('contraseña incorrecta');
  }

    return (
      <ScrollView>
        {!active ? <View style={styles.container}>
          <View >
          <Text style={styles.title}>Inicio de sesion</Text>
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            value={pass}
            onChangeText={setPass}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />
          </View>
          <View style={{marginBottom: 10}}>
          <Button
              title={'Login'}
              onPress={() => onLogin()}
            />
        </View>
        <View>
          <Button
            title={'Regresar'}
            onPress={() => navigation.goBack()}
          />
        </View>
        </View>
        :
        <View>
          <Pressable onPress={() =>setActive(false)} style={styles.buttonClose}>
            <Text>Cerrar Sesión</Text>
          </Pressable>
          <Admin />
        </View>

        }
      </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  title:{
    marginBottom: 30,
    fontSize: 25,
    fontFamily: 'Roboto',
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
  backgroundColor: '#74c468',
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