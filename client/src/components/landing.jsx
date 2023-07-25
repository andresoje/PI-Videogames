import React from "react";
import PathRoutes from "./helpers";
import { Link } from "react-router-dom";
import styles from "../CSS/landing.module.css"

const Landing = () => {
    return(
        <div className={styles.repo}>
            <div className={styles.container}>
                <p className={styles.tittle}>Bienvenido a mis videojuegos</p>
                <Link to={PathRoutes.HOME}>
                    <button className={styles.botonStart}>🎮Start 🎮</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;