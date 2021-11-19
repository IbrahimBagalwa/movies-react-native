import React from 'react';
import { StyleSheet, Button, TextInput, View, FlatList, ActivityIndicator } from 'react-native';
// import films from '../helpers/filmData'
import FilmsItem from './FilmsItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';
class SearchScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
        this.searchText =""
    }

    _loadFilms() {
        if(this.searchText.length > 0){
            this.setState({isLoading: true})
            getFilmsFromApiWithSearchedText(this.searchText).then(data=>
                this.setState({
                    films: data.results,
                    isLoading:false
                }))
        }
    }
    _searchTextInputChanged(text){
        this.searchText = text
    }
    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
    }
 render(){
    //  console.log(this.state.isLoading);
     return(
         <View style={styles.main_container}>
             <TextInput 
                placeholder="Titre du film..."
                style={styles.textInputSyle} 
                onChangeText={(text)=>this._searchTextInputChanged(text)} 
                onSubmitEditing={()=>this._loadFilms()} 
             />
             <Button style={styles.buttonStyle} title="Search" onPress={()=>this._loadFilms()}/>
             <FlatList
                data={this.state.films}
                keyExtractor= {(item)=>item.id.toString()}
                renderItem={({item})=><FilmsItem film={item}/>}
             />
             {this._displayLoading()}
         </View>
     )
 }
}

const styles = StyleSheet.create({
    main_container:{
        marginTop:20,
        flex: 1,
    },
    textInputSyle:{
        marginLeft: 5,
        marginRight: 5,
        height: 50,
        borderColor: '#000000',
        borderWidth: 0.3,
        paddingLeft: 5
    },
    buttonStyle:{
        height: 50,
    },
    loading_container:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default SearchScreen
