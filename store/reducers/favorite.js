const intialState = {favoriteFilms:[]};

function toggleFavorite(state = intialState, action){
    let nextState;
    switch(action.type){
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoriteFilms.findIndex(item => item.id === action.value.id);
            if(favoriteFilmIndex !== -1){
                // on supprime le film du favorie
            }else{
                // on ajoute le film parmi le favorie
            }
            return nextState || state
        default:
            return state
    }
}