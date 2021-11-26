
import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Search from '../components/SearchScreen';
import FilmDetail from '../components/FilmDetail';
import Favorite from '../components/Favorite';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image, StyleSheet } from 'react-native';
import Test from '../components/Test';

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions:{
            title: "Rechercher"
        }
    },
    FilmDetail:{
        screen:FilmDetail,
        navigationOptions:{
            title:"Detail"
        }
    }
})

const FavoritesStackNavidator = createStackNavigator({
    Favorite:{
        screen: Favorite,
        navigationOptions:{
            title: 'Favoris'
        }
    },
    FilmDetail:{
        screen: FilmDetail,
        navigationOptions:{
            title:'Detail'
        }
    }
})
const moveviesTabNavigation = createBottomTabNavigator({
    Test:{
        screen: Test,
    },
    Search: {
        screen : SearchStackNavigator,
        navigationOptions:{
            tabBarIcon: ()=>{
                return(
                    <Image source={require('../assets/_icsearch.png')} style={styles.image} />
                )
            }
        }
    },
    Favorite: {
        screen : FavoritesStackNavidator,
        navigationOptions:{
            tabBarIcon: ()=>{
                return(
                    <Image source={require('../assets/ic_fav.png')} style={styles.image} />
                )
            }
        }
    },
}, { tabBarOptions:{
    activeBackgroundColor: '#DDDDDD',
    inactiveBackgroundColor: '#FFFFFF',
    showLabel: false,
    showIcon: true,
}})

const styles = StyleSheet.create({
    image:{
        width: 30,
        height: 30,
    }
})
export default createAppContainer(moveviesTabNavigation)