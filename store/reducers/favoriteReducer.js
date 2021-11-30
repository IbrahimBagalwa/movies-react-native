const intialState = {favoriteFilms:[]};

function toggleFavorite(state = intialState, action){
    let nextState;
    switch(action.type){
        case 'TOGGLE_FAVORITE':
            // on verifier si le film fait deja partie de nos vavories
            const favoriteFilmIndex = state.favoriteFilms.findIndex(item => item.id === action.value.id);
            if(favoriteFilmIndex !== -1){
                // on supprime le film du favorie
                nextState = {
                    ...state,
                    favoriteFilms: state.favoriteFilms.filter((item, index)=> index !== favoriteFilmIndex)
                }

            }else{
                // on ajoute le film parmi le favorie
                nextState = {
                    ...state,
                    favoriteFilms: [...state.favoriteFilms, action.value]
                }
            }
            return nextState || state
            
        default:
            return state
    }
}
export default toggleFavorite