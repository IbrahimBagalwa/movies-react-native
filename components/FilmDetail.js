import moment from 'moment';
import numeral from 'numeral';
import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Image, Button, TouchableOpacity, Platform, Share } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi';
import {connect} from 'react-redux';

class FilmDetail extends React.Component{
    static navigationsOption =({navigation})=>{
        const {params} = navigation.state
        // On accède à la fonction shareFilm et au film via les paramètres qu'on a ajouté à la navigation
        if(params.film != undefined && Platform.OS ==='ios'){
            return{
                // On a besoin d'afficher une image, il faut donc passe par une Touchable une fois de plus
                headerRight:
                <TouchableOpacity
                    style={styles.share_touchable_headerright}
                    onPress={()=> params._shareFilm()}
                >
                    <Image 
                        style={styles.share_image}
                        source={require('../assets/ic_send_ios.png')}
                    />
                </TouchableOpacity>
            }
        }
    }


    constructor(props){
        super(props)
        this.state= {
            film :undefined,
            isLoading : true
        }
         // Ne pas oublier de binder la fonction _shareFilm sinon, lorsqu'on va l'appeler depuis le headerRight de la navigation, 
        //  this.state.film sera undefined et fera planter l'application
        this._shareFilm = this._shareFilm.bind(this)
    }
    _updateNavigationParams(){
          // Fonction pour faire passer la fonction _shareFilm et le film aux paramètres de la navigation. Ainsi on aura accès à ces données au moment de définir le headerRight
        this.props.navigation.setParams({
            shareFilm = this._shareFilm,
            film = this.state.film
        })

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
    _shareFilm(){
        const {film} = this.state
        Share.share({title: film.title, message:film.overview})
    }
    _displayFloatingActionBottom(){
        const {film} = this.state
        if(film != undefined && Platform.OS === 'android'){
            return(
                <TouchableOpacity
                    style={styles.share_touchable_floatingactionbutton}
                    onPress={()=>{this._shareFilm()}}
                >
                    <Image 
                        style={styles.share_image}
                        source ={require('../assets/ic_send_android.png')}
                    />
                </TouchableOpacity>
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
                {this._displayFloatingActionBottom()}
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
    },
    share_touchable_floatingactionbutton: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        backgroundColor: '#e91e63',
        justifyContent: 'center',
        alignItems: 'center'
      },
      share_image: {
        width: 30,
        height: 30
      }
})
const mapStateToProps = (state)=>{
    return {
        favoriteFilms: state.favoriteFilms
    }
}
export default connect(mapStateToProps)(FilmDetail)