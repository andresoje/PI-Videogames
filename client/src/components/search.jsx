import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';
import PathRoutes from "./helpers";
import styles from "../CSS/search.module.css"


const Search = () => {
    const [name, setName] = useState(""); // Inicializamos el name como un string vacio
    const [reset, setReset] = useState(false); // Inicializamos el reset en false
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    function handleName(e) { // este handle se encarga de cambiar el estado local del nombre
      setName(e.target.value);
    }
  
    function handleSearch(name) { // este handle sirve para llamar al videojuego de la a traves de la action getAllVideogames 
      if (name === "") {
        return alert("No has ingreso ningun nombre"); // en caso de que este vacio
      }
      dispatch(actions.getAllVideogames(null, name));
      navigate(`${PathRoutes.HOME}`);
      setName("");
      setReset(true);
    }
  
    function resetSearch() { // retornamos al principio con resetSearch de las actions 
      dispatch(actions.resetSearch());
      setReset(false);
    }
    return (
        <div className={styles.container}>
            <input
            type="text" 
            name="search"
            value={name}
            placeholder="Buscar un Videojuego"
            onChange={handleName}
            className={styles.search}
            />
            <button onClick={() => handleSearch(name)} className={styles.boton}>
                🔎 Buscar 🔍
            </button>
            {reset
            ? (
                <button onClick={resetSearch} className={styles.boton}>
                    🔃 Reset 🔃
                </button>
            )
            : null}
        </div>
    )
}

export default Search;