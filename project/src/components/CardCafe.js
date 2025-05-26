import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons';

class CardCafe extends Component {
    constructor(props) {
        super(props);
        this.state={
            like:false
        }

       
    }

    componentDidMount() {
        if (this.props.cafe.data.likes.includes(auth.currentUser.email)) {
            this.setState({ like: true });
        }
    }

    likear(){
        db.collection('posts')
        .doc(this.props.cafe.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>this.setState({
            like:true
        }))
    }

    dislike(){
        db.collection('posts')
        .doc(this.props.cafe.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>this.setState({
            like:false
        }))

    }

    

    render() {
       

        return (
            <View style={styles.subContainer}>
                <Text style={styles.titulo}>{this.props.cafe.data.titulo}</Text>
                <Text style={styles.descripcion}>{this.props.cafe.data.descripcion}</Text>
                <Text style={styles.user}>Publicado por: {this.props.cafe.data.email}</Text>
                {       this.state.like ?
                        <TouchableOpacity onPress={() => this.dislike()}>
                            <Text>DisLike</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => this.likear()}>
                            <Text>Like</Text>
                        </TouchableOpacity>
                }
        
            </View>
        );
    }
}

export default CardCafe;


const styles = StyleSheet.create({
    subContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    descripcion: {
        fontSize: 18,
        textAlign: 'center',
        color: '#606060',
        fontFamily: 'Roboto',
        marginBottom: 5
    },
    titulo: {
        fontSize: 22,
        textAlign: 'center',
        color: '#606060',
        fontFamily: 'Roboto',
        marginBottom: 5
    },

    user: {
        textAlign: 'flex-end',
        color: '#606060',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontStyle: 'italic',
    },
})