module.exports = function(sequelize, dataTypes){
  let alias = "Roles";

  //Declarar lo datos de la tabla usuarios
  let cols = {
    idRole:{
      type: dataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      auto_increment:true,
      validate:{
        notNull: true,
      }
    },
    nameRole:{
      type: dataTypes.STRING(20),
      allowNull: false,
      validate:{
        notNull: true,
      }
    }
  }

  let config = {
      tableName:'roles',
      timestamps: false
  }

  let Rol = sequelize.define(alias,cols, config);

 // Relaciones de la tabla Roles 1:N
  Rol.associate = function(models){
    Rol.belongsTo(models.Usuarios,{
      as: "roles",
      foreignKey: "idRole"
    });
  }

  return Rol
}