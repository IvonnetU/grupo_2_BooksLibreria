module.exports = function(sequelize, dataTypes){
  let alias = "DetalleOrdenes";

  //Declarar lo datos de la tabla detalle ordenes
  let cols = {
    idDetails:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      auto_increment:true,
      validate:{
        notNull: true,
      }
    },
    idProduct:{
      type: dataTypes.VARCHAR(30),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    idOrder:{
      type: dataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
      }
    }
  }

  let config = {
      tableName:'details_order',
      timestamps: false
  }

  let DetailOrder = sequelize.define(alias,cols, config);

 // Relaciones de la tabla Detalle orden 1:N
  DetailOrder.associate = function(models){
    DetailOrder.belongsTo(models.Ordenes,{
      as: "ordenes",
      foreignKey: "idOrder"
    });
    DetailOrder.belongsTo(models.Productos,{
      as: "producto",
      foreignKey: "idProduct"
    });

  }

  return DetailOrder
}