import { API_TOKEN } from "../token";

export function getFilmsFromApiWithSearchedText(text){
    const url = 'https://api.themoviedb.org/3/movie/550?api_key=' + API_TOKEN + '&language=fr&query=' + text;
    return fetch(url)
        .then((response)=> response.json())
        .catch((error)=> console.log(error))
}