import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Credentials', `${username} + ${password}`);
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Text style={styles.title}>Inicio de sesion</Text>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <Button
              title={'Login'}
              onPress={this.onLogin.bind(this)}
            />
        </View>
        <View>
          <Button
            title={'Registrarse'}
            onPress={this.onLogin.bind(this)}
          />
        </View>
      </View>
    );
  }
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
});