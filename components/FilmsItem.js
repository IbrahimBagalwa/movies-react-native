import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {getImageFromApi} from '../API/TMDBApi';
class FilmsItem extends React.Component{

  _dispalayFoviriteImage(){
    if(this.props.isFilmFavorite){
      var sourceImage = require('../assets/ic_like.png');
      return(
        <Image 
          source={sourceImage}
          style={styles.favarite_image}
        />
      )
    }
  }
    render(){
       const {film, displayDetailForFilm} = this.props;
        return(
            <TouchableOpacity 
              onPress={()=>displayDetailForFilm(film.id)}
              style={styles.main_container}
            >
                <Image style={styles.image} source={{uri: getImageFromApi(film.poster_path? film.poster_path : film.backdrop_path)}}/>
                <View style={styles.content_container}>
                    <View style={styles.header_container}>
                        {this._dispalayFoviriteImage()}
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style={styles.description_container}> 
                        <Text style={styles.description_text} numberOfLines={8}>{film.overview ? film.overview : 'Aucune description pour le moment'}</Text>
                    </View>
                    <View style={styles.date_container}>
                        <Text style={styles.date_text}>Sortie le : {film.release_date}</Text>
                    </View>   
                </View>
            </TouchableOpacity>
        )
    }

}export default FilmsItem

const styles = StyleSheet.create({
    main_container: {
      height: 190,
      flexDirection: 'row'
    },
    image: {
      width: 120,
      height: 180,
      margin: 5,
      backgroundColor: 'gray'
    },
    content_container: {
      flex: 1,
      margin: 5
    },
    header_container: {
      flex: 3,
      flexDirection: 'row'
    },
    title_text: {
      fontWeight: 'bold',
      fontSize: 20,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5
    },
    vote_text: {
      fontWeight: 'bold',
      fontSize: 26,
      color: '#666666'
    },
    description_container: {
      flex: 7
    },
    description_text: {
      fontStyle: 'italic',
      color: '#666666'
    },
    date_container: {
      flex: 1
    },
    date_text: {
      textAlign: 'right',
      fontSize: 14
    },
    favarite_image:{
      width: 25,
      height: 25,
      marginRight:5,
    }
  })