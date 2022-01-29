module.exports = function(sequelize, dataTypes){
  let alias = "Categorias";

  //Declarar lo datos de la tabla categorias
  let cols = {
    idCategory:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      auto_increment:true,
      validate:{
        notNull: true,
      }
    },
    nameCategory:{
      type: dataTypes.VARCHAR(30),
      allowNull: false,
      validate:{
        notNull: true,
      }
    }
  }

  let config = {
      tableName:'categorys',
      timestamps: false
  }

  let Categoria = sequelize.define(alias,cols, config);

 // Relaciones de la tabla Categorias 1:N
  Categoria.associate = function(models){
    Categoria.belongsTo(models.Productos,{
      as: "categorias",
      foreignKey: "idCategory"
    });
  }

  return Categoria
}