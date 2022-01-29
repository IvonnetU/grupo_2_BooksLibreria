module.exports = function(sequelize, dataTypes){
  
  // Alias de como llamaremos esta tabla en proximas consultas
  let alias = "Usuarios";

  //Declarar lo datos de la tabla usuarios
  let cols = {
    email:{
      type: dataTypes.STRING(50),
      primaryKey: true,
      allowNull: false,
      validate:{
        notNull: true,
        isEmail: true,
      }
    },
    names:{
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    surnames:{
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    city:{
      type: dataTypes.STRING(20),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    cellphone:{
      type: dataTypes.STRING(15),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    pass:{
      type: dataTypes.STRING(70),
      allowNull: false,
      validate:{
        notNull: true,
        min: 6,
      }
    },
    confirmPass:{
      type: dataTypes.STRING(70),
      allowNull: false,
      validate:{
        notNull: true,
        min: 6,
        equals: this.pass,
      }
    },
    acceptCondition:{
      type: dataTypes.CHAR(5),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    idRole:{
      type: dataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    avatar:{
      type: dataTypes.STRING(100)
    }
  }

  // nombre de la tabla en la base de datos
  let config = {
      tableName:'users',
      timestamps: false
  }

  let Usuario = sequelize.define(alias,cols, config);

  // Relaciones de la tabla Usuarios N:1
  Usuario.associate = function(models){
    Usuario.hasMany(models.Roles,{
      as: "usuarios",
      foreignKey: "idRole"
    });
  }

  return Usuario
}