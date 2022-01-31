module.exports = function(sequelize, dataTypes){
  
  // Alias de como llamaremos esta tabla en proximas consultas
  let alias = "Productos";

  //Declarar lo datos de la tabla peliculas
  let cols = {
    sku:{
      type: dataTypes.STRING(30),
      primaryKey: true,
      allowNull: false,
      validate:{
        notNull: true
      }
    },
    nameBook:{
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    idAuthor:{
      type: dataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    price:{
      type: dataTypes.DOUBLE,
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    publisher:{
      type: dataTypes.STRING(30),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    idFormat:{
      type: dataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    idCategory:{
      type: dataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    languageBook:{
      type: dataTypes.STRING(20),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    editionBook:{
      type: dataTypes.CHAR(10),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    pages:{
      type: dataTypes.STRING(30),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    chapters:{
      type: dataTypes.STRING(30),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    imageProduct:{
      type: dataTypes.STRING(50),
      allowNull: false,
      validate:{
        notNull: true,
      }
    },
    descriptionBook:{
      type: dataTypes.STRING(100),
      allowNull: false,
      validate:{
        notNull: true,
      }
    }
  }

  // nombre de la tabla en la base de datos
  let config = {
      tableName:'products',
      timestamps: false
  }

  let Producto = sequelize.define(alias,cols, config);

  // Relaciones de la tabla Prodcutos N:1
  Producto.associate = function(models){

    Producto.hasMany(models.Autores,{
      as: "autores",
      foreignKey: "idAuthor"
    });

    Producto.hasMany(models.Formatos,{
      as: "formatos",
      foreignKey: "idFormat"
    });

    Producto.hasMany(models.Categorias,{
      as: "categorias",
      foreignKey: "idCategory"
    });

    // Relaciones con la tabla ordenes N:M
    Producto.belongsToMany(models.Ordenes,{
      as: "ordenesPrductos",
      through: "details_order", //tabla intermedia
      foreignKey: "idProduct",
      otherKey: "idOrder",
      timestamps: false
    });

  }

  return Producto
}