const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame, Genre, VideogameGenre } = require('../db');
const { URL_BASE, API_KEY } = process.env;
const { Router, response } = require('express');
const router = Router();

const getVideogamesFromApi = async (name) => { //Creamos una funcion asincronica que recibira un nombre
    try {
        let apiData = [];
        let arrayApi = [];
        let videogamesApi = [];


        if (name) { // Si tenemos un nombre entonces hacemos un llamado a la API para traer el juego por el nombre
            apiData = await axios(
                `${URL_BASE}games?search=${name}&key=${API_KEY}`
            );
            arrayApi = apiData.data.results; //Nuestra arrayApi ahora tendra el results de la data

            if (arrayApi.length) {// Si lo anterior tuvo exito tendremos una array que deberemos mapear para traer los elementos de acuerdo al modelo
                videogamesApi = arrayApi.map((vj) => {
                    return {
                        id: vj.id,
                        name: vj.name,
                        description: vj.description,
                        platforms: vj.platforms,
                        background_image: vj.background_image,
                        released: vj.released,
                        rating: vj.rating,
                        genres: vj.genres.map((g) => {
                          return g.name;
                      }).join(' - ') //Dado que un videojuego trae varios generos, con esto mapeamos el nombre de cada genero y los trae conectados por un -
                    };
                });
            } else {
                return [] //Si lo anterior falla entonces traera una array vacio y seguimos 
            }
        } else {
            for (let i = 1; i < 6; i++) { //Tenemos que hacer un llamado 5 veces para traer 100 videojuegos dado que la API tiene 20 videojuegos por pagina
                apiData = await axios(
                    `${URL_BASE}games?key=${API_KEY}&page=${i}`
                );
                arrayApi.push(apiData); //Agregamos nuestros elementos al ArrayApi
            }
            if (arrayApi.length) {//Al tener un arrayApi entonces reamos una promesa donde mapearemos todos los juegos acuerdo a modelos, mas o menos como el ejercicio anterior
                arrayApi = await Promise.all(arrayApi);

                videogamesApi = arrayApi.map((response) =>
                    response.data.results.map((vj) => {
                        return {
                            id: vj.id,
                            name: vj.name,
                            description: vj.description,
                            platforms: vj.platforms,
                            background_image: vj.background_image,
                            released: vj.released,
                            rating: vj.rating,
                            genres: vj.genres.map((g) => {
                              return g.name;
                          }).join(' - ') //Esto lo leimos arriba
                        };
                    })
                ); videogamesApi = videogamesApi.flat() //En este punto VideogamesAPI es un array de arrays, con flat se unen en un solo array
              } else {
                return [];
              }
            }
        

            return videogamesApi;

    } catch (error) {
        return { error: error.message};
    }
}

const getVideogamesFromDb = async (name) => {
  
    try {
      if (!name) {
        let vgsBd = await Videogame.findAll({
          //este funciona con un [] de generos
          include: {
            model: Genre,
            through: {
              attributes: [],
            },
          },
        });
        return vgsBd;
  
      } else {
        let vgsBd = await Videogame.findAll({
          where: { name: { [Op.iLike]: `%${name}%` } },
          include: {
            model: Genre,
            through: {
              attributes: [],
            },
          },
        });
        return vgsBd;
      }
    } catch (error) {
      return { error: error };
    }
  };
  

  router.get("/", async (req, res) => {
    try {
      const { con,  name } = req.query;
  
      let vgsApi = [];
      let vgsDb = [];
      let videogames = [];

      if(name){
        vgsApi = await getVideogamesFromApi(name); 
        vgsDb = await getVideogamesFromDb(name);
  
        videogames = [...vgsApi, ...vgsDb]; //agrego los vg de la bd
      }  
      
      else if(con === "2"){
        vgsApi = await getVideogamesFromApi();
        vgsDb = await getVideogamesFromDb();

        videogames = [...vgsApi, ...vgsDb]; //agrego los vg de la bd 
      }
  
      else if(con === "1"){
        
        vgsDb = await getVideogamesFromDb();

        videogames = [ ...vgsDb]; //agrego los vg de la bd 
      }
      
  
      if (videogames.length) {

        return res.status(200).json({ videogames });
      } else {
        return res
          .status(400)
          .json({ Message: "No tenemos el videojuego que buscas, lo siento" });
      }
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  });


  router.post("/", async (req, res) => {
    try {
      const {
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        genres, 
        origen,
      } = req.body;
       if (
        !name |
        !description |
        !platforms |
        !background_image |
        !released |
        !rating|
        !genres.length
      ) {
        return res.status(400).json({ Message: "Faltan datos" });
      } else {
      let newVideogameBd = await Videogame.create({
        name,
        description,
        platforms,
        background_image,
        released,
        rating,
        origen,
      });
  
      let genreIntance;
      let arrayGenreInstances = [];
      const long = genres.length;//genres es un [] que viene del front 
  
      for (let i = 0; i < long; i++) {     
        genreIntance = await Genre.findOne({ where: { name: genres[i] } });
        arrayGenreInstances.push(genreIntance);
      }
  
      //if (arrayGenreInstances.length) {
      newVideogameBd.addGenres(arrayGenreInstances); //aqui le paso las instancias de genero al vg creado
  
      const videogame = await Videogame.findOne({
        //este funciona con un [] de generos
        where: { name },
        include: {
          model: Genre,
          through: {
            attributes: [],
          },
        },
      });
    
      return res.status(201).json({videogame}); //devuelve el objeto creado en la bd
      // }
      }  
    } catch (error) {
      return res.status(400).json({ Error: error.message });
    }
  });
  
  module.exports = router;