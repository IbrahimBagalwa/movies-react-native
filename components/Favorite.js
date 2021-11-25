import React from "react";
import { StyleSheet, Text } from "react-native";
import FilmList from "./FilmList";
import {connect} from 'react-redux';
class Favorite extends React.Component{
    render(){
        return(
            <FilmList
                films= {this.props.favoriteFilms}
                navigation = {this.props.navigation}
                favoriteList = {true}
            />
        )
    }
}

const styles = StyleSheet.create({
    
})

const mapStateToProps = state =>{
   return { 
    favoriteFilms: state.favoriteFilms 
   }
}

export default connect(mapStateToProps)(Favorite);