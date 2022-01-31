module.exports = function(sequelize, dataTypes){
  let alias = "Ordenes";

  //Declarar lo datos de la tabla ordenes
  let cols = {
    idOrder:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      auto_increment:true,
      validate:{
        notNull: true,
      }
    },
    numberOrder:{
      type: dataTypes.STRING(20),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    idUser:{
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notNull: true,
      }
    }
  }

  let config = {
      tableName:'orders',
      timestamps: false
  }

  let Orden = sequelize.define(alias,cols, config);

 // Relaciones de la tabla Orden N:1
  Orden.associate = function(models){
    Orden.hasMany(models.Usuarios,{
      as: "ordenesUsuarios",
      foreignKey: "idUser"
    });

    // Relaciones con la tabla productos N:M
    Orden.belongsToMany(models.Productos,{
      as: "ordenesProductos",
      through: "details_order", //tabla intermedia
      foreignKey: "idOrder",
      otherKey: "idProduct",
      timestamps: false
    });

  }

  return Orden
}