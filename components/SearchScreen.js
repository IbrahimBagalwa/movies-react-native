import React from 'react';
import { StyleSheet, Button, TextInput, View, FlatList, ActivityIndicator } from 'react-native';
// import films from '../helpers/filmData'
import FilmsItem from './FilmsItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';
import {connect} from 'react-redux';
import FilmList from './FilmList';
class SearchScreen extends React.Component {
    constructor(props){
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }
        this.searchText =""
    }

    _loadFilms() {
        if(this.searchText.length > 0){
            this.setState({isLoading: true})
            getFilmsFromApiWithSearchedText(this.searchText, this.page+1).then(data=>{
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    films: [...this.state.films,...data.results],
                    isLoading:false
                })
            })
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
    _searchFilm(){
        this.page = 0
        this.totalPages = 0
        this.setState({
            films:[]
        }, ()=>{
            // console.log("Page: " + this.page + " / TotalPages :" + this.totalPages +" / Nombre de films :" + this.state.films.length)
            this._loadFilms()
        })
    }
   
 render(){
    //  console.log(this.state.isLoading);
     return(
         <View style={styles.main_container}>
             <TextInput 
                placeholder="Titre du film..."
                style={styles.textInputSyle} 
                onChangeText={(text)=>this._searchTextInputChanged(text)} 
                onSubmitEditing={()=>this._searchFilm()} 
             />
             <Button style={styles.buttonStyle} title="Search" onPress={()=>this._searchFilm()}/>
             <FilmList
                films={this.state.films}
                navigation={this.props.navigation}
                loadFilms={this._loadFilms}
                page = {this.page}
                totalPages={this.totalPages}
             /> 
          
             {this._displayLoading()}
         </View>
     )
 }
}

const styles = StyleSheet.create({
    main_container:{
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
const mapStateToProps = state =>{
    return{
        favoriteFilms: state.favoriteFilms
    }
}
export default connect(mapStateToProps)(SearchScreen)
