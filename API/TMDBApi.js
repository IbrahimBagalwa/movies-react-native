import { API_TOKEN } from "../helpers/token";

export function getFilmsFromApiWithSearchedText(text){
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text;
    return fetch(url)
        .then((response)=> response.json())
        .catch((error)=> console.log(error))
}
export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w500/' + name
}