import React from "react";
import { StyleSheet, Text } from "react-native";
import FilmList from "./FilmList";

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

export default Favorite;