const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID, // Genera IDs unicos lo que hace que lo diferencia de los a la API
      defaultValue: DataTypes.UUIDV4, // nos dara por defecto un valor unico y el V4 es en la version 4 de node
      allowNull: false, // Con esto no se aceptan valores en null, es decir que esta casilla no podra estar vacia
      primaryKey: true // Se tomara el ID como llave primaria
    },

    name: {
      type: DataTypes.STRING, //el tipo de dato es una string
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    platforms: {
      type: DataTypes.ARRAY(DataTypes.TEXT), // Con esto se creara un Array con las [PS, xbox, etc] 
      allowNull: false,
    },

    background_image: {
      type: DataTypes.TEXT, //quedara el URL de la imagen como texto
      allowNull: false,
    },
    
    released: {
      type: DataTypes.DATEONLY, //Permitira colocar una fecha especifica
    },

    rating: {
      type: DataTypes.INTEGER,
    },

    origen:{
      type: DataTypes.STRING,      
    },
  }, { timestamps: false }); // con esto ya no veremos las fechas de creacion en la tabla de la db
};
