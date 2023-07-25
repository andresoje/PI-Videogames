import React from "react";
import { Link } from "react-router-dom";
import Search from "./search";
import PathRoutes from "./helpers";
import styles from "../CSS/navbar.module.css"

const NavBar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.repoBoton}>
                <Link to={PathRoutes.HOME} className={styles.botonNav}>Inicio</Link>
                <Link to={PathRoutes.FORM} className={styles.botonNav}>Creador</Link>
            </div>
            <div>
                <Search />
            </div>
        </div>
    )
}

export default NavBar