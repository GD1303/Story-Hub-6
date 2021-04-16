import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, TextInput, ScrollView, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import firebase from 'firebase';

import db from '../config'

export default class ReadStory extends React.Component{
    constructor() {
        super();
        this.state = {
            allStories: [],
            dataSource: [],
            search: '',
        }
    }

    componentDidMount() {
        this.retrieveStories();
    }

    retrieveStories = () => {
        var allStories = [];
        var stories = db
            .collection('stories')
            .get()
            .then((query) => {
                query.forEach((doc) => {
                    allStories.push(doc.data());
                    console.log(allStories);
                })
                this.setState({
                    allStories: allStories,
                })
            })
    }

    SearchFilterFunction = (text) => {
        const data = this.state.allStories.filter((item) => {
            const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();

            return itemData.indexOf(textData) > -1;
        });

        this.setState({
            dataSource: data,
            search: text,
        })
    }

    render() {
        return(
            <View style = { styles.container }>
                <View style = { styles.header }>
                    <Text style = { styles.title }>
                        Story Hub
                    </Text>
                </View>
                <ScrollView>
                    <View style = {{ height: 20, width: '100%' }}>
                        <SearchBar
                            placeholder = "Type Here..."
                            onChangeText = { (text) => {
                                this.SearchFilterFunction(text);
                            }}
                            onClear = { (text) => {
                                this.SearchFilterFunction('');
                            }}
                            value = { this.state.search } />
                    </View>
                    
                    <FlatList
                        data = { this.state.search === "" ? this.state.allStories : this.state.dataSource }
                        renderItem = {({ item }) => (
                            <View style = { styles.itemContainer }>
                                <Text style = {[styles.item, { fontWeight: 'bold' }]}>  
                                    Title: { item.title }
                                </Text>
                                <Text style = {[ styles.item, { fontStyle: 'italic' }]}>
                                    Author: { item.author }
                                </Text>
                            </View>
                        )}
                        keyExtractor = { (item, index) => index.toString() } /> 
                </ScrollView>
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
    }
});