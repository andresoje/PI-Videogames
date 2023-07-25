import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../redux/actions';
import styles from "../CSS/details.module.css"

function isFromDatabase(id, array) {
    const vgToDetail = array.filter((e) => e.id === id);
    console.log(vgToDetail);
    const isDB = vgToDetail.filter((e) => e.origen === "db");
    if (isDB.length > 0) {
      return true;
    } else return false;
  }

  const Details = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const videogames = useSelector((state) => state.videogames);

    useEffect(() => {
        //use effect para obtener los detalles del videogame dado su id
        const connection = async () => {
          let creado = false;
          setLoading(true);
          const vgDb = await isFromDatabase(id, videogames);
          if (vgDb) {
            setVgCreated(true);
            creado = true;
          }
          await dispatch(actions.getDetails(id, creado));
          setLoading(false);
        };
        connection();
        return () => dispatch(actions.resetDetails());
      }, [dispatch, id, videogames]);

      const [loading, setLoading] = useState(false);
      const [vgCreated, setVgCreated] = useState(false); //lo inicializo como que es de la api
    
      const details = useSelector((state) => state.videogameDetails);

      function handleClick() {
        navigate(-1);
      }

      return (
        <div className={styles.containerGif}>
            { loading 
            ? ( <div >
                <img src = "https://i.pinimg.com/originals/ea/b7/e1/eab7e1120c9dd628d3bb39a20a94927d.gif" alt = "cargando" />
                </div>
                ) 
            : ( <div>
                <div className={styles.container}> 
                    <div>
                        <div className={styles.text}>{`Id: ${details.id}`}</div>
                        <div className={styles.text}>{details.name}</div>
                        <div className={styles.text}>{`Calificacion: ${details.rating}`}</div>
                        <div className={styles.text}>{`Lanzamiento: ${details.released}`}</div>
                        <div className={styles.text}>{`Plataformas: ${details.platforms}`}</div>
                        <div className={styles.text}>{`Genero: ${details.genres}`}</div>
                      <div className={styles.text}>
                        <div dangerouslySetInnerHTML={{ __html: details.description }} ></div>
                      </div>
                    </div>
                    <div>
                        <img src={details.background_image} alt="portada del videojuego" className={styles.img}/>
                    </div>
                    <div>
                        <button onClick={handleClick} className={styles.boton}>◀ Atras ◀</button>
                    </div>
                </div>
            </div>
                                
            )}
        </div>
      )
  }

  export default Details;