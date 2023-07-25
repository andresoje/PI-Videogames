import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions'
import styles from "../CSS/filter.module.css"

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
  
  const Filter = () => {
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
   
    const [visible, setVisible] = useState(false);
    const [selectValue, setSelectValue] = useState('');
  
    const genres = useSelector((state) => state.genres);
  
    function handleFilters(e) {
      
      const { name, value } = e.target;
  
      if(value!=="title"){
        if (name === "filterOrigen") {

          return dispatch(actions.filterOrigen(value));
        }
     
        if (name === "filterGenre") {
          return dispatch(actions.filterGenre(value));
        }  
    
        setVisible(false);
        return dispatch(actions.orderVideogames(selectValue, value));
      } 
      else{
       return  alert('Escoge una Opcion Correcta');
      }   
    }
  
  function activarOrderSelect(value){
    if(value!=="title"){
    setVisible(true);
    setSelectValue(value); 
    }else{
      return  alert('Escoge una Opcion Correcta');
    }  
  }
  return (
    <div className={styles.container}>
        <select name="filterOrigen" onChange={handleFilters} className={styles.boton}>
            <option  value="title">
                -Creados-
            </option>
            <option value="all">Todos</option>
            <option value="api">API</option>
            <option value="db">BD</option>
        </select>

        <select name="filterGenre" id="filterGenre" onChange={handleFilters} className={styles.boton}>
            <option  value="title">
                -Generos-
            </option>
        {genres.length &&
            genres.map((g) => {
            return (
                <option key={g.name} value={g.name}>
                {g.name}
                </option>
            );
            })}
        </select>

        <select name="orderRN" onChange={(e)=>activarOrderSelect(e.target.value)} className={styles.boton}>
            <option value="title">-Sort by-</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
        </select>

    { visible ? (<select name="orderAD" onChange={handleFilters} className={styles.boton}>
            <option value="title">-Sort by-</option>
            <option value="asc">Asc</option>
            <option value="des">Des</option>
        </select>) : null}
  </div>
  )
}

export default Filter;