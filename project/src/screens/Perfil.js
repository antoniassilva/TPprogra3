import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { auth } from '../firebase/config';

class Perfil extends Component{
    constructor(props){
        super(props)
    }
     handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch((error) => {
        console.error('Error al cerrar sesión: ', error);
      });
  };
     render() {

        return(
            <View>
                <Text>Perfil</Text>
                <TouchableOpacity onPress={this.handleLogout}>
            <Text>Logout</Text>
          </TouchableOpacity>
            </View>
        )
     }
}

export default Perfil;