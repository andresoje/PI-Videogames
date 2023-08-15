const axios = require('axios');
const { Router } = require('express');
const { URL_BASE, API_KEY } = process.env;
const { Videogame } = require('../db');
const router = Router();

const isNumeric = n => !!Number(n); //Con esto me aseguro que se envie un numero valido dado que sera 0 === false 1, 2, 3, etc === true

router.get("/:id", async(req,res)=>{//idVideogame
   try{
    const { id } = req.params;
    const { creado } = req.query;
    
    if(id){
        if(isNumeric(id)){

         let copyVideogame = {};

         if(creado === "false"){

           const apiData = await axios(`${URL_BASE}games/${id}?key=${API_KEY}`)
            const videogame = apiData.data;  
               
             //hago esto para tomar solo las propiedades que me interesan de la data
              copyVideogame.id = videogame.id;
              copyVideogame.name = videogame.name;
              copyVideogame.description = videogame.description;
              copyVideogame.platforms = videogame.platforms.map(e => e.platform.name).join(' - ')
              copyVideogame.background_image = videogame.background_image;              
              copyVideogame.released = videogame.released;
              copyVideogame.rating = videogame.rating;
              copyVideogame.genres = videogame.genres.map((g) => g.name).join(' - ');
         }
         else {
    
    copyVideogame =  await Videogame.findByPk(id); 
         }       

          return res.status(200).json({copyVideogame});           
        }
        else{
           return res.status(400).json({'Mensage': ` ${id} no es un Id valido`});
        }
    }
   }catch(error){
    return res.status(404).json({'Error': error.message });
   }    
})

module.exports = router;