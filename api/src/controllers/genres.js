const axios = require('axios');
const { Router } = require('express');
const { URL_BASE, API_KEY } = process.env;
const { Genre } = require('../db');

const router = Router();

const getGenresFromApi = async () => {
  try {
    let resultData = await  axios(`${URL_BASE}genres?key=${API_KEY}`)  
    let result = resultData.data.results;
    let arrayGenres = result.map(genre => {
       return {
           id: genre.id,
           name: genre.name             
       }
   })   
      await Genre.bulkCreate(arrayGenres);//Esto me permite insertar varios generos en masivo de acuerdo a la tabla Genre

      return arrayGenres;
  } catch (error) {
      return {error: error.message}
  }
};

router.get("/", async (req,res)=>{
    try{   
     let genres = await getGenresFromApi();
      return res.status(201).send({genres});
    }catch(error){
        return res.status(400).json({error: error.message});
    }    
});



module.exports = router;