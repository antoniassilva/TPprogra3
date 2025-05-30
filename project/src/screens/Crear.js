import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { auth, db } from '../firebase/config';

class Crear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo:'',
      descripcion: '',
      error: ''
    };
  }

  onSubmit = () => {
    db.collection('posts').add({
        email: auth.currentUser.email,
        descripcion: this.state.descripcion,
        titulo:this.state.titulo,
        likes: [],
        createdAt: Date.now(),
      })
      .then(() => {
        this.setState({ error: "", descripcion: "",titulo:""});
        this.props.navigation.navigate("Home");
      })
      .catch((e) => {
        console.log(e);
        this.setState({ error: 'Error al guardar el post. Intenta de nuevo.' });
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
          placeholder="Nombre de la Cafeteria"
          value={this.state.titulo}
          onChangeText={(text) => this.setState({ titulo: text })}
        />

        <TextInput
          style={styles.campo}
          placeholder="Descripcion del Cafe"
          value={this.state.descripcion}
          onChangeText={(text) => this.setState({ descripcion: text })}
        />
        {this.state.error ? (
          <Text style={styles.errorText}>{this.state.error}</Text>
        ) : null}

        <TouchableOpacity style={styles.boton} onPress={this.onSubmit}>
          <Text style={styles.botonText}>Publicar cafe</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Crear;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    backgroundColor: '#CE9870'
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
    backgroundColor: '#A0673C',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    width: '90%',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#A0673C',
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
  }

});
