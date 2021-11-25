import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, Button, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';
import {connect} from 'react-redux';

class FilmDetail extends React.Component{
    constructor(props){
        super(props)
        this.state= {
            film :undefined,
            isLoading : true
        }
    }
    componentDidMount(){
        // console.log('component did mount')
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
        .then(data=>{
            this.setState({
                film: data,
                isLoading: false,
            })
        })
    }
    _toggleFavorite(){
        const action = {type: "TOGGLE_FAVORITE", value: this.state.film}
        this.props.dispatch(action)
    }
    _displayFavoriteImage(){
        var sourceImage = require('../assets/ic_favO.png');
        if(this.props.favoriteFilms.findIndex(item=> item.id === this.state.film.id) !== -1){
            sourceImage = require('../assets/ic_fav.png')  
        }
        return(
            <Image 
                style={styles.favorite_Image}
                source={sourceImage}
            />
        )
    }

    componentDidUpdate(){
        console.log(this.props.favoriteFilms)
    }
    _displayFilm(){
        const film = this.state.film
        if(film != undefined){
            return(
                <ScrollView style={styles.scrollview_container}>
                    <Image 
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path ? film.backdrop_path : film.poster_path)}} 
                    />
                    <Text style={styles.header_text_detail} >{film.title}</Text>
                    <TouchableOpacity
                        style={styles.favorite_container}
                        onPress={()=>this._toggleFavorite()}
                    >
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style={styles.desc_text_deatail} >{ film.overview ? film.overview : 'Aucune description pour le moment'}</Text>
                    <Text style={styles.default_text}>Sortie le : {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style={styles.default_text}>Note : {film.vote_average ? film.vote_average:0 }/10 </Text>
                    <Text style={styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style={styles.default_text}>Budget : {numeral(film.budget).format('0.0[.]00 $') }</Text>
                    <Text style={styles.default_text}>Genre(s) : {film.genres.map((genre)=>{return genre.name;}).join(" / ")}</Text>
                    <Text style={styles.default_text}>Compagnie(s) : {film.production_companies.map((company)=>{
                        return company.name;
                    }).join(" / ")}</Text>
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
        console.log(this.props)
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
    },
    favorite_container:{
        alignItems:'center'
    },
    favorite_Image:{
        width: 40,
        height: 40,
        // mixBlendMode:'multiply',
    }
})
const mapStateToProps = (state)=>{
    return {
        favoriteFilms: state.favoriteFilms
    }
}
export default connect(mapStateToProps)(FilmDetail)