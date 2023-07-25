import React from "react";
import {Link} from 'react-router-dom';
import styles from "../CSS/card.module.css"

const Card = ({ id, name, background_image, genres, rating, origen }) => {
return (
    <div className={styles.container}>
            <img src={background_image} alt="falta imagen" className={styles.img}/>

        <div>
            <div>
                <h3 className={styles.text}>{name}</h3>
            </div>  
            <div className={styles.containerText}>
                <h3 className={styles.text}>{`Calificacion: ${rating}`}</h3>
                <h3 className={styles.text}>{genres}</h3>
                <h3><Link to={`/details/${id}`} className={styles.textDetail}>Detalles</Link></h3>
            </div>
        </div>
    </div>
)
}

export default Card