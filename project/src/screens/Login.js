import React, { Component } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      logueado: false,
      error: '',
    };
  }

  componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if(user){
                this.props.navigation.navigate('Tab')
            }
        })
    }

  onSubmit = () => {
    

    if (!this.state.email.includes('@')) {
      this.setState({ error: 'Email mal formateado' });
      return;
    }

    if (this.state.password.length < 6) {
      this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres' });
      return;
    }

    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((response) => {
        this.setState({ logueado: true, error: '' });
        this.props.navigation.navigate('Tab'); 
      })
      .catch(error => {
        this.setState({ error: 'Mail o la contraseña incorrecta.' });
      });
  };

  render() {
    return (
      <View style={styles.container}>
         <Image
            source={require('../../assets/fondo1.png')}
            style={styles.backgroundImage} 
         />
        <Text style={styles.nombre}>Cafe y opina</Text>
    
        <TextInput
          style={styles.campo}
          keyboardType='email'
          placeholder='email'
          onChangeText={text => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.campo}
          keyboardType='default'
          placeholder='contraseña'
          secureTextEntry={true}
          onChangeText={text => this.setState({ password: text })}
          value={this.state.password}
        />

        <TouchableOpacity style={styles.boton}onPress={this.onSubmit}>
          <Text style={styles.botonText}>Login</Text>
        </TouchableOpacity>

        {this.state.error ? <Text style={styles.error}>{this.state.error}</Text> : null}

        <TouchableOpacity style={styles.boton}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.botonText}>¿No tienes cuenta?</Text>
        </TouchableOpacity>

        
      </View>
    );
  }
}

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor:'#F3E1D1'

  },
  
  nombre: {
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
  },
    
 backgroundImage: {
    position: 'absolute', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, 
  },
  
  campo: {
    width: '90%',
    marginBottom: 20,
    padding: 15,
    borderColor: '#3A3A3A',
    borderWidth: 1.5,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#333',
    fontFamily: 'Roboto',
  },
  boton: {
    backgroundColor: '#3A3A3A',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#3A3A3A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  botonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'Roboto',
  },
  error: {
    color: '#FF4D4D',
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});