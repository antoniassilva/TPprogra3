import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { db } from '../firebase/config';
import CardCafe from "../components/CardCafe"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],

    };
  }

  componentDidMount() {
    db.collection('posts')
    .orderBy("createdAt", "desc")
    .onSnapshot(
      docs => {
        let posts = [];
        docs.forEach((doc) => {
          posts.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        this.setState({ 
            posteos: posts
         });
      },
      (error) => console.log(error)
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/fondo1.png')}
          style={styles.backgroundImage} 
        />
        <Text style={styles.titulo}>Cafe y opina</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => 
          <View style={styles.subContainer}>
            <CardCafe cafe={item}/>
          </View>
          }
        
        />

        </View>
      
    );
  }
}
export default Home;

const styles = StyleSheet.create({

  container:{
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      paddingHorizontal: 25,
     
    },
    titulo: {
    fontSize: 36,
    color: '#FFFFFF',
    margin: 20,
    textAlign: 'center',
    fontFamily: 'italic',
  },
    
 backgroundImage: {
    position: 'absolute', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, 
  },
  subContainer:{
    width: '100%',
    padding: 7,
    marginBottom: 20,
    borderColor: '#3A3A3A',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
 

})