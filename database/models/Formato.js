module.exports = function(sequelize, dataTypes){
  let alias = "Formatos";

  //Declarar lo datos de la tabla formato
  let cols = {
    idFormat:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      auto_increment:true,
      validate:{
        notNull: true,
      }
    },
    nameFormat:{
      type: dataTypes.STRING(30),
      allowNull: false,
      validate:{
        notNull: true,
      }
    }
  }

  let config = {
      tableName:'formats',
      timestamps: false
  }

  let Formato = sequelize.define(alias,cols, config);

 // Relaciones de la tabla Formatos 1:N
  Formato.associate = function(models){
    Formato.belongsTo(models.Productos,{
      as: "formatos",
      foreignKey: "idFormat"
    });
  }

  return Formato
}