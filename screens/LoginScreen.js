import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Touchable } from 'react-native';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailId: '',
            password: '',
        }
    }

    login = async( email, password ) => {
        if(email && password) {
            try{
                const response = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password);
                
                if(response) {
                    this.props.navigation.navigate('Transaction')
                }
            }
            catch(error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('User does not exist.')
                        console.log('non-existant')

                    break;

                    case 'auth/invalid-email':
                        alert('Incorrect Email or Password.')
                        console.log('invalid')
                        
                    break;
                }
            }
        } else {
            alert('Enter Email and Password')
        }
    }

    render() {
        return(
            <View style = { styles.container }>
            <View style = {[ styles.header ]}>
                <Text style = { styles.title }>
                    Story Hub
                </Text>
            </View>
                <KeyboardAvoidingView style = {{ alignItems: 'center', marginTop: 20 }}>
                    <View>
                        <Image
                            source = { require("../assets/booklogo.jpeg") }
                            style = {{ width: 200, height: 200, borderWidth: 3, borderColor: '#4F4846', borderRadius: 20 }} />
                        <Text style = {{ textAlign: 'center', fontSize: 30 }}>
                            Wily
                        </Text>
                    </View>
                    <View>
                        <TextInput 
                            style = { styles.loginBox }
                            placeholder = 'abc@example.com'
                            keyboardType = 'email-address'
                            onChangeText = {(text) => {
                                this.setState({
                                    emailId: text
                                })
                            }} />
                        <TextInput 
                            style = { styles.loginBox }
                            secureTextEntry = { true }
                            placeholder = '****'
                            onChangeText = {(text) => {
                                this.setState({
                                    password: text
                                })
                            }} />
                    </View>
                    <View>
                        <TouchableOpacity 
                            style = {{ 
                                borderWidth: 2,
                                marginTop: 20,
                                borderRadius: 10,
                                padding: 10,
                                alignContent: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center'
                            }}
                            onPress = {() => {
                                this.login( this.state.emailId, this.state.password )
                            }}>
                            <Text style = {{ textAlign: 'center', fontSize: 20 }}>
                                LOGIN
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF8F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        backgroundColor: '#E8CEBF',
        borderRadius: 20,
    },
    title: {
        color: '#4F4846',
        padding: 30,
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    displayText: {
        fontSize: 15,
        textDecorationLine: 'underline',
    },
    itemContainer: {
        marginTop: 50,
        height: 80,
        width:'100%',
        borderWidth: 4,
        borderColor: 'black',
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        padding: 20,
    },
    item: {
        fontSize: 25,
        alignSelf: 'center',
    },
    loginBox: {
        width: 250,
        height: 50,
        borderWidth: 1.5,
        fontSize: 20,
        margin: 15,
        paddingLeft: 15,
    },
});