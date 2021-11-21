import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getFilmDetailFromApi } from '../API/TMDBApi';

class FilmDetail extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            film :undefined,
            isLoading : true
        }
    }
    componentDidMount(){
        console.log('component did mount')
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
        .then(data=>{
            this.setState({
                film: data,
                isLoading: false,
            })
        })
    }
    _displayFilm(){
        const film = this.state.film
        if(film != undefined){
            return(
                <ScrollView style={styles.scrollview_container}>
                    <Text style={styles.header_text_detail} >{film.title}</Text>
                    <Text style={styles.desc_text_deatail} >{film.overview}</Text>
                </ScrollView>
            )
        }
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
    render() {
        console.log('render')
        const idFilm = this.props.navigation.state.params.idFilm
        return(
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container:{
        flex: 1,
    },
    loading_container:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems:'center',
        justifyContent:'center'
    },
    scrollview_container:{
        flex: 1,
    },
    header_text_detail:{
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        margin:5
    },
    desc_text_deatail:{
        fontStyle: 'italic'
    }
})
export default FilmDetail