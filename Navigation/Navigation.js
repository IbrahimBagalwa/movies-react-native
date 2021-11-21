import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Search from '../components/SearchScreen';
import FilmDetail from '../components/FilmDetail';

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions:{
            title: "Rechercher"
        }
    },
    Datail:{
        screen:FilmDetail,
        navigationOptions:{
            title:"Detail"
        }
    }
})
export default createAppContainer(SearchStackNavigator)