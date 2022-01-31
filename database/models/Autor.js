module.exports = function(sequelize, dataTypes){
  let alias = "Autores";

  //Declarar lo datos de la tabla autores
  let cols = {
    idAuthor:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      auto_increment:true,
      validate:{
        notNull: true,
      }
    },
    nameAuthor:{
      type: dataTypes.STRING(30),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    surnameAuthor:{
      type: dataTypes.STRING(30),
      allowNull: false,
      validate:{
        notNull: true,
      }
    }
  }

  let config = {
      tableName:'authors',
      timestamps: false
  }

  let Autor = sequelize.define(alias,cols, config);

 // Relaciones de la tabla Autores 1:N
  Autor.associate = function(models){
    Autor.belongsTo(models.Productos,{
      as: "autores",
      foreignKey: "idAuthor"
    });
  }

  return Autor
}