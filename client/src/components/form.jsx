import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions';
import styles from "../CSS/form.module.css"

const arrayPlatformValues = 
["Playstation 5", "Playstation 4", "Playstation 3", "Playstation 2", "Playstation", "Xbox series S/X", "Xbox 360", "PC", "Nintendo" ];

const PlatformValues = arrayPlatformValues.sort(); //ordeno el array alfabeticamente

async function getGenresOk() {
    try {
      let response = await fetch("http://localhost:3001/genresdb");
      const data = await response.json();
      if (data.genres.length !== 0) {
        return true;
      } else return false;
    } catch (error) {
      console.log(error.message);
    }
  }

const Form = () => {
  
    const dispatch = useDispatch();  
  
    useEffect(() => {
        const connection = async () => {
    
          const aux = await getGenresOk();
  
          if (aux) {
            //si es true, tengo los generos ya en la bd
            await dispatch(actions.getGenres("db")); //aqui pongo el en state lo que hay en la bd
          } else {
            await dispatch(actions.getGenres("api")); //obtengo los genres de la api y los guardo en la bg
          }
        };
        connection();
      }, [dispatch]);

    const genres = useSelector((state) => state.genres); 
    const [videogame, setVideogame] = useState({
      name: " ",
      description: " ",
      released: " ",
      background_image: " ",
      rating: 0,    
      platforms: "",
      genres: "",
    });
  
    const [error, setError] = useState({
      name: " ",
      description: " ",
      released: " ",
      background_image: " ",
      rating: " ",    
      platforms: " ",
      genres: " ",
    });
    
    function resetFields(){
      setVideogame({
        name: " ",
        description: " ",
        released: " ",
        background_image: " ",
        rating: " ",
        genres:'',
        platforms:"",
      });
      setError({
        name: " ",
        description: " ",
        released: " ",
        background_image: " ",
        rating: " ",
        genres: " ",
        platforms: " ",
      })
    } ;
    
  
    function validate(obj) {
      let myError = {}; 
       
        if (!obj.name) myError.name = "Falta un Nombre";
        if (!obj.description) myError.description = "Falta una descripcion";
        if (!obj.released) myError.released = "Falta una fecha";
        if (!obj.background_image) myError.background_image = "Falta una imagen";
        if (obj.description.length >= 35) myError.description = "La descripcion debe tener maximo 35 caracteres";
        if (obj.rating > 5 || obj.rating < 0) myError.rating = "La Puntuacion debe ser entre 5 y 1";
        
        return myError;
      }
    
     
    const handleVideogame = (e) =>{           
        setVideogame({ ...videogame,  [e.target.name] : e.target.value }); 
        setError( validate({...videogame,  [e.target.name] : e.target.value }));  
    }
  
    const  handleSelectValues = (e) => {
      if(e.target.value !== ""){
        let aux=[];
  
  
        if(!videogame[e.target.name].includes(e.target.value)){ //si el videojuego no esta en el array  
          setVideogame({...videogame,  [e.target.name]:[...videogame[e.target.name], e.target.value]} )
          setError( validate({...videogame,  [e.target.name]:[...videogame[e.target.name], e.target.value]} ))
        }  
        else{//si el videojuego ya esta en el array y le di click por 2da vez
          aux = videogame[e.target.name].filter(elem => elem !== e.target.value)
          setVideogame({...videogame, [e.target.name]: aux} )
          setError( validate({...videogame, [e.target.name]: aux}))
        }
      }
     
    }  
  
    async function handleSubmit(e) {  
      e.preventDefault();
      const hayErrors = validate({ ...videogame, [e.target.name]: e.target.value })//es un objeto
      const arrayError = Object.values(hayErrors)//array con los valores del objeto
  
      console.log(arrayError);
      console.log(arrayError.length)
  
      if(!arrayError.length 
        && videogame.name !== " "  
        && videogame.description !== " "
        && videogame.rating !== " " 
        && videogame.released !== " " 
        && videogame.platforms !== " "
        && videogame.background_image !== " " 
        && videogame.genres.length) {
  
        videogame.origen = "db"; //agrego el origen de este videojuego
        videogame.platforms = videogame.platforms.join('-');
  
        await dispatch( actions.addVideogame(videogame));      
        resetFields(); //pongo los campos en blanco
        alert("Videojuego Creado")
      }
      else{
       return alert("Revisa la Informacion");
      }
    }
    return (
        <div>
            <div>
                    <h1 className={styles.tittle}> Crea tu Videojuego</h1>
                <form onSubmit={handleSubmit} className={styles.container}> 

                    <div>
                        <label htmlFor="name" className={styles.text}>
                            Nombre: 
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={videogame.name}
                            onChange={handleVideogame}
                            className={styles.search}
                        />
                        </label>
                        {error.name && <p>{error.name}</p>}
                    </div>
                    
                    <div>
                        <label className={styles.text}>
                            Descripcion: 
                        <input
                            id="description"
                            name="description"
                            value={videogame.description}
                            onChange={handleVideogame}
                            className={styles.search}
                        />
                        </label>
                        {error.description && <p>{error.description}</p>}          
                     </div>

                    <div>
                        <label htmlFor="background_image" className={styles.text}>
                            Imagen: 
                        <input
                            type="text"
                            id="background_image"
                            name="background_image"
                            value={videogame.background_image}
                            onChange={handleVideogame}
                            className={styles.search}
                        />
                        </label>
                        {error.background_image && <p>{error.background_image}</p>}
                    </div>

                    <div>
                    <label className={styles.text}>
                        Plataforma: 
                    <select
                        id="platforms"
                        name="platforms"
                        value={videogame.platforms}
                        onChange={handleSelectValues}
                        className={styles.search}
                    >
                        <option value="">-Plataformas-</option>
                        {PlatformValues.map((e) => (
                        <option key={e} value={e}>{e}</option>
                    ))}
                                
                    </select>   
                    </label> 
                        {error.platforms && <p>{error.platforms}</p>}
                    </div>

                    <div>
                        <label className={styles.text}>
                            Genero: 
                        <select name="genres" id="genres" value={videogame.genres} onChange={handleSelectValues} className={styles.search}>
                            <option value="" >-Genero-</option>
                            {genres && genres.map((g) => {
                            return <option key={g.name} value={g.name}>{g.name}</option>;
                                })}
                        </select>
                        </label>
                    </div>

                    <div>
                        <label className={styles.text}>
                            Lanzamiento: 
                        <input
                            type="date"
                            id="released"
                            name="released"
                            value={videogame.released}
                            onChange={handleVideogame}
                            className={styles.search}
                        />
                        </label>
                        {error.released && <p>{error.released}</p>}
                    </div>

                    <div>
                        <label className={styles.text}>
                            Calificacion: 
                        <input
                            type="number" 
                            name="rating"
                            id="rating" 
                            min="0" 
                            step="0.1"                       
                            value={videogame.rating}
                            onChange={handleVideogame}
                            className={styles.search}
                        />
                        </label>
                        {error.rating && <p>{error.rating}</p>}
                    </div>

                    <div>
                        <button className={styles.boton}>
                            💡 Crear 💡
                        </button>
                    </div>
                </form>
                <div className={styles.container}>
                    <div>
                        <img src={videogame.background_image} alt={videogame.name} className={styles.img} />
                        <p className={styles.text}>Vista Previa</p>
                    </div>

                    <div>
                      {videogame.genres.length 
                      ?(<div>
                      <h3 className={styles.text}>Genero Seleccionado:</h3>
                          {videogame.genres.map((element)=>{
                          return <label key={element} className={styles.text}>{element} - </label>
                      })}  
                          </div>)
                      :null}
                      <br/>
                    </div>

                    <div>
                      {videogame.platforms.length 
                      ?(<div>
                      <h3 className={styles.text}>Plataforma Selecionada:</h3>
                          {videogame.platforms.map((element)=>{
                          return <label key={element} className={styles.text}>{element}</label>
                      })}  
                      </div>)
                      :null}
                    </div>

                </div>     

             </div>
         </div>
     )
}

export default Form;