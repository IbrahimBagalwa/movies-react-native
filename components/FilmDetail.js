import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';

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
                    <Image 
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}} 
                    />
                    <Text style={styles.header_text_detail} >{film.title}</Text>
                    <Text style={styles.desc_text_deatail} >{film.overview}</Text>
                    <View style={styles.default_text}>
                        <Text>Sortie le : {film.release_date}</Text>
                        <Text>Note : {film.release_date}</Text>
                        <Text>Nombre de votes : {film.release_date}</Text>
                        <Text>Budget : {film.budget} $</Text>
                        <Text>Genre(s) : {film.budget}</Text>
                        <Text>Compagnie(s) : {film.release_date}</Text>
                    </View>
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
    image:{
        height: 170,
        margin: 5,
    },
    scrollview_container:{
        flex: 1,
    },
    header_text_detail:{
        textAlign: 'center',
        fontSize: 35,
        flex: 1,
        flexWrap:'wrap',
        fontWeight: 'bold',
        marginLeft:5,
        marginRight:5,
        marginTop:10,
        marginBottom:10,
        color:'#000000'
    },
    desc_text_deatail:{
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom:15,
    },
    default_text:{
        marginTop: 5,   
        marginLeft: 5,
        marginRight: 5,   
    }
})
export default FilmDetail