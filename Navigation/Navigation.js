import {createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Search from '../components/SearchScreen';

const SearchStackNavigator = createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions:{
            title: "Rechercher"
        }
    }
})
export default createAppContainer(SearchStackNavigator)