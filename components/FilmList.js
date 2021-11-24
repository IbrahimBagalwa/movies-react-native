import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FilmsItem from "./FilmsItem";
import {connect} from 'react-redux';

class FilmList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            films:[]
        }
    }
    _displaydDetailFromFilm = (idFilm)=>{
        console.log("Display film detail id" + idFilm);
        this.props.navigation.navigate("FilmDetail",{idFilm: idFilm})
    }
    render(){
        return(
            <FlatList
                style={styles.list}
                data={this.state.films}
                extraData = {this.props.favoriteFilms}
                keyExtractor= {(item)=>item.id.toString()}
                renderItem={({item})=>
                    <FilmsItem 
                    film={item} 
                    isFilmFavorite={(this.props.favoriteFilms.findIndex(film=> film.id === item.id) !== -1) ? true : false } 
                    displayDetailForFilm={this._displaydDetailFromFilm} 
                />}
                onEndReachedThreshold={0.5}
                onEndReached={()=>{
                    if(this.props.page < this.props.totalPages){
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }
}

const styles = StyleSheet.create({
    list:{
        flex: 1,
    }
})
const mapStateToProps = state =>{
    return{
        favoriteFilms: state.favoriteFilms
    }
}
export default connect(mapStateToProps)(FilmList);