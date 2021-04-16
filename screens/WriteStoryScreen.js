import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, KeyboardAvoidingView, ToastAndroid } from 'react-native';

import db from '../config'
import firebase from 'firebase';

export default class WriteStory extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            story: '',
        }
    }

    submitStory = () => {
        var submittedMessage = "Story Submitted!"

        db.collection("stories").add({
            title: this.state.title,
            author: this.state.author,
            story: this.state.story,
        });

        this.setState({
            title: '',
            author: '',
            story: ''
        });

        alert(submittedMessage)
    }

    render() {
        return(
            <View style = { styles.container }>
                <View style = { styles.header }>
                    <Text style = { styles.title }>
                        Story Hub
                    </Text>
                </View>
                <KeyboardAvoidingView
                    style = { styles.container }
                    behavior = "padding"
                    enabled >
                    <ScrollView>
                        <View style = { styles.inputView }>
                            <TextInput
                                style = { styles.inputBox }
                                placeholder = "Story Title"
                                onChangeText = {(text) => {
                                    this.setState({
                                        title: text
                                    })
                                }}
                                value = { this.state.title } />
                        </View>
                        <View style = { styles.inputView }>
                            <TextInput
                                style = { styles.inputBox } 
                                placeholder = "Author"
                                onChangeText = {(text) => {
                                    this.setState({
                                        author: text
                                    })
                                }}
                                value = { this.state.author } />
                        </View>
                        <View style = { styles.inputView }>
                            <TextInput
                                style = {[ styles.inputBox, { height: 350, textAlignVertical: "top" }]} 
                                placeholder = "Write Your Story Here"
                                multiline = { true }
                                onChangeText = {(text) => {
                                    this.setState({
                                        story: text
                                    })
                                }}
                                value = { this.state.story } />
                        </View>
                        <View>
                            <TouchableOpacity 
                                style = { styles.scanButton }
                                onPress = { this.submitStory }>
                                <Text style = { styles.buttonText }>
                                    SUBMIT
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
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
    scanButton: {
        backgroundColor: '#ffffff',
        width: 100,
        borderWidth: 1.5,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        textAlign: 'center',
        padding: 10
    },
    inputView: {
        flexDirection: 'row',
        margin: 20,
    },
    inputBox: {
        flex: 1,
        alignItems: 'stretch',
        borderWidth: 1.5,
        fontSize: 20,
        padding: 10,
    },
});