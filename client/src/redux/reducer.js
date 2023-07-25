import {
    GET_VIDEOGAMES, 
    ADD_VIDEOGAME,
    GET_DETAILS,
    RESET_DETAILS,
    GET_GENRES,
    FILTER_GENRE, FILTER_ORIGEN,
    ORDER,
    RESET_SEARCH, 
    GET_VIDEOGAMES_NAME,
  } from "./actions.js";
  
  const initialState = {
    videogames: [],
    videogamesCopy: [],
    videogameDetails: {},
    genres: [],
  };
  
  export default function reducer(state = initialState, { type, payload }) {
    switch (type) {
  
      case ADD_VIDEOGAME:    
        return {        
          ...state,
          videogames: [...state.videogames, payload], //agrego el vg creado a vgs y vgsDb                    
          videogamesCopy: [...state.videogamesCopy, payload],
        };      
  
      case GET_VIDEOGAMES://   sobreescribo lo que hay    en videogame y en la copia
        return {
          ...state, 
          videogames: payload,
          videogamesCopy: payload,
        }; 
  
        case GET_VIDEOGAMES_NAME://    
        return {
          ...state, 
          videogames: payload,        
        }; 
  
       
  
      case GET_DETAILS:
        console.log(
          `se ejecuto en reducer en get details, payload es ${payload}`
        );
        return {
          ...state,
          videogameDetails: payload,
        };
  
      case RESET_DETAILS:
        return {
          ...state,
          videogameDetails: {},
        };
  
      case GET_GENRES:
         return {
          ...state,
          genres: payload,
        };
        
  
      case FILTER_GENRE:
          const filterCopy = [...state.videogamesCopy];
          const filterGender = filterCopy.filter(vg => vg.genres.includes(payload))
          console.log(filterGender)
          return{
              ...state, 
              videogames: filterGender
          }   
  
          case FILTER_ORIGEN:   
          console.log( 'es videogamesCopy') 
          console.log(state.videogamesCopy)
  
              let arrayCopy = [...state.videogamesCopy]; //pongo en el array lo que hay en el state en ese momento
              let filterOrigen =[]
  
              if(payload === "api"){
                 filterOrigen = arrayCopy.filter(vg => !vg.origen)
                 console.log( 'resultado filter api') 
                
              }
              if(payload === "db"){
                console.log( 'resultado filter bd') 
                 filterOrigen = arrayCopy.filter(vg => vg.origen === "db")
              }
              if(payload === "all"){
                console.log( 'resultado filter all') 
                filterOrigen = [...state.videogamesCopy]
              } 
              
              console.log(filterOrigen)
              return{
                  ...state, 
                  videogames: filterOrigen    
              };
  
              case ORDER:
               const orderCopy = [...state.videogames];
               let order = []
               if(payload[0] === "name"){
                order = orderCopy.sort((a,b) => {
                   if(a.name > b.name){
                      return payload[1] === "asc" ? 1 : -1
                   }
                   if(a.name < b.name){
                      return payload[1] === "asc" ? -1 : 1
                   }
                 });
                }
  
                if(payload[0] === "rating"){
                  order = orderCopy.sort((a,b) => {
                     if(a.rating > b.rating){
                        return payload[1] === "asc" ? 1 : -1
                     }
                     if(a.rating < b.rating){
                        return payload[1] === "asc" ? -1 : 1
                     }
                   });
                  }
                
          return {
              ...state,
              videogames: order,
          };
  
  
          case RESET_SEARCH:
            return {
            ...state, videogames: state.videogamesCopy
          };
  
      default:
        return state;
    }
  }
  
  
  /**
   * case ADD_VIDEOGAME:
        return {
          ...state,
          videogames: [...state.videogames, payload], //agrego el vg creado a vgs y vgsDb
          videogamesCopy: [...state.videogames, payload],
        };
   */