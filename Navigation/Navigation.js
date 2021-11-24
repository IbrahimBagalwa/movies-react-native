import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Search from '../components/SearchScreen';
import FilmDetail from '../components/FilmDetail';
import Favorite from '../components/Favorite';
import { createBottomTabNavigator } from 'react-navigation-tabs';

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
const moveviesTabNavigation = createBottomTabNavigator({
    Search: {
        screen : Search
    },
    Favorite: {
        screnn : Favorite
    }
})
export default createAppContainer(moveviesTabNavigation)