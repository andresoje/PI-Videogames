import React from 'react'
import styles from "../CSS/pagination.module.css"

const Pagination = ({totalvj, vjporpagi, paginacion}) => {
    const NumdePaginas = [];

    // Aqui tengo un arreglo con el numero de paginas necesarias
    for (let i = 1; i <= Math.ceil(totalvj/vjporpagi); i++) {
        NumdePaginas.push(i);
    }
    // paginacion viene del Home y sirve para cambiar la pagina actual al numero que este en el boton n
    return (
        <div>
            <nav>
                <ul className={styles.container}>
                    {NumdePaginas.map(n => (
                        <li key={n} >
                            <button onClick={() => paginacion(n)} className={styles.boton}>{n}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;