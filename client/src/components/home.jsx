import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions';
import Card from "./card";
import Pagination from './pagination';
import Filter from './filter';
import styles from "../CSS/home.module.css"

const Home = () => {
    
    let currentVideogames = []
    const [loading, setLoading] = useState(false);
    const [pagactual, setPagactual] = useState(1);
    const [vjporpagi, setVjporpagi] = useState(10)
    
    let videogames = useSelector(state => state.videogames)
    const dispatch = useDispatch()

    useEffect(() => {
        let con = 2; //Desde aqui se conecta a la base de datos y a la API
        if (videogames.length === 0) {
            const serverConection = async () => {
                setLoading(true);
                await dispatch(actions.getAllVideogames(con, null));
                setLoading(false)
            }
            serverConection();
        }
    }, [dispatch, videogames.length]);

    const iultimovideojuego = pagactual * vjporpagi;
    const iprimervideojuego = iultimovideojuego - vjporpagi;

    const paginacion = (NumdePaginas) => {
        setPagactual(NumdePaginas);
    }

    if (videogames.length) {
        currentVideogames = videogames.slice(
            iprimervideojuego,
            iultimovideojuego
        )
    }
    return (
            <div>
                {loading  
                ? ( <div>
                    <img src = "https://i.pinimg.com/originals/ea/b7/e1/eab7e1120c9dd628d3bb39a20a94927d.gif" alt = "cargando"/>
                    </div>) 
                : ( <div>
                    <div>
                        {videogames.length && (
                            <Pagination
                            vjporpagi={vjporpagi}
                            totalvj={videogames.length}
                            paginacion={paginacion} />
                        )}
                    </div>
                </div> 
                )}
                    <Filter />

                <div className={styles.container}>
                    {currentVideogames 
                    && currentVideogames.map((e) => (
                                <Card
                                key={e.id}
                                id={e.id}
                                name={e.name}
                                background_image={e.background_image}
                                rating={e.rating}
                                genres={e.genres}
                                origen={e.origen}
                                genresDb={e.Genres}
                            />
                    ))}
                </div>

            </div>
    )

}    

export default Home;
