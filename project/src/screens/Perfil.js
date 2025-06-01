import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import { auth, db } from '../firebase/config';

class Perfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: auth.currentUser.email,
      userName: '',
      userPosts: [],
    };
  }

  componentDidMount() {
    db.collection('users')
      .where('owner', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        docs.forEach((doc) => {
          this.setState({ userName: doc.data().username });
        });
      });

    db.collection('posts')
      .where('email', '==', auth.currentUser.email)
      .onSnapshot((docs) => {
        let postArray = [];
        docs.forEach((doc) => {
          postArray.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        postArray.sort((a, b) => b.data.createdAt - a.data.createdAt);
        this.setState({ userPosts: postArray });
      });
  }

   logout(){
    auth.signOut()
    .then(()=> this.props.navigation.navigate('Login'))
    .catch(err => console.log('err en signout', err))
  }

  eliminarPost (id) {
    db.collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        console.log(`Post ${id} eliminado`);
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <View style={styles.back}>
        <Image
          source={require('../../assets/fondo1.png')}
          style={styles.backgroundImage}
        />

        <View style={styles.container}>
          <Text style={styles.nombre}>Cafe y opina</Text>

          <View style={styles.subcontainer}>
            <Text style={styles.titulo}>Perfil</Text>
            <Text style={styles.descripcion}>Email: {this.state.email}</Text>
            <Text style={styles.descripcion}>
              Usuario: {this.state.userName}
            </Text>
            <Text style={styles.descripcion}>
              Número de Posts: {this.state.userPosts.length}
            </Text>
          </View>

          <TouchableOpacity style={styles.boton} onPress={() => this.logout()}>
            <Text style={styles.botonText}>Logout</Text>
          </TouchableOpacity>

          {this.state.userPosts.length === 0 ? (
            <Text style={styles.noPosts}>No hay posts</Text>
          ) : (
            <FlatList
              data={this.state.userPosts}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.postsContainer}
              renderItem={({ item }) => (
                <View style={styles.posteos}>
                  <Text style={styles.subText}>{item.data.titulo}</Text>
                  <Text style={styles.subText}>{item.data.descripcion}</Text>
                  <TouchableOpacity
                    style={styles.eliminarBoton}
                    onPress={() => this.eliminarPost(item.id)}
                  >
                    <Text style={styles.eliminarText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </View>
    );
  }
}

export default Perfil;

const styles = StyleSheet.create({
  back: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  nombre: {
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Georgia',
    fontStyle: 'italic',
  },
 subcontainer: {
  width: 220,
  height: 220,
  backgroundColor: '#A0673C',
  borderRadius: 110,
  padding: 6,
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 8,
  elevation: 3,
   borderWidth: 3,           
  borderColor: '#FFFFFF',
},
  titulo: {
    color: '#ffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Roboto',
  },
  descripcion: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
    fontFamily: 'Roboto',
  },
  boton: {
    backgroundColor: '#3A3A3A',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 30,
  },
  botonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  postsContainer: {
    alignItems: 'center',
    paddingBottom: 50,
    
  },
  posteos: {
    width: 270,
    padding: 10,
    marginBottom: 20,
    borderColor: '#3A3A3A',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#A0673C',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  subText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    marginBottom: 5,
  },
  eliminarBoton: {
    marginTop: 10,
    backgroundColor: '#FF4D4D',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  eliminarText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  noPosts: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Roboto',
  },
});
