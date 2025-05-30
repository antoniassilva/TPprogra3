import React, {Component} from 'react'
import { Text, View, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import { auth, db } from '../firebase/config'


class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password: '',
            username: '',
            error: ''
        }
    }


    registrarUsuario(email, password, username){
        if (!email.includes('@')) {
            this.setState({ error: 'Email mal formateado' });
            return;
        }

        if (password.length < 6) {
        this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres' });
        return;
        }

        if (username === "") {
        this.setState({ error: 'Debe ingresar su nombre' });
        return;
        }
          auth.createUserWithEmailAndPassword(email, password)
          .then(() => {

            db.collection('users')
            .add({
                owner: email,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                username: username
            })
            .then(()=> {
                this.props.navigation.navigate('Login')
            })

          })
          .catch(err=> console.log('err:', err))  
        }
    

    render(){
        return(
            <View style={styles.container}>
                 <Image
                            source={require('../../assets/fondo1.png')}
                            style={styles.backgroundImage} 
                         />
                        <Text style={styles.nombre}>Cafe y opina</Text>
            
           
                <TextInput
                    style={styles.campo}
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text})}
                    keyboardType='default'
                    placeholder='email'
                />
                <TextInput
                    style={styles.campo}
                    value={this.state.password}
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    keyboardType='default'
                />
                <TextInput
                    style={styles.campo}
                    value={this.state.username}
                    placeholder='username'
                    onChangeText={(text) => this.setState({username: text})}
                    keyboardType='default'
                />
                <TouchableOpacity style={styles.boton} onPress={()=> this.registrarUsuario(this.state.email, this.state.password, this.state.username)}>
                    <Text style={styles.botonText}>Registrar usuario</Text>
                </TouchableOpacity>
                 {this.state.error? <Text style={styles.error}>{this.state.error}</Text> : null}

                <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.botonText}>Ya tengo cuenta</Text>
                </TouchableOpacity>
            </View>
        )
    }
}



export default Register
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
