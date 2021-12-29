const path = require('path');
const fs = require('fs');

const User = {
  usersFilePath: path.join(__dirname, '../data/users.json'),

  getData: function(){
    return JSON.parse(fs.readFileSync(this.usersFilePath, 'utf-8'));
  },

  genereteId: function(){
    let allUsers = this.findAll();
    let lastUser = allUsers.pop();
    if(lastUser){
      return lastUser.id + 1;
    }
    return 1;    
  },

  findAll: function(){
    return this.getData();
  },

  findByPk: function(id){
    let allUsers = this.findAll();
    let userFound = allUsers.find(oneUser => oneUser.id === id);
    return userFound;
  },

  findByField: function(field,text){
    let allUsers = this.findAll();
    let userFound = allUsers.find(oneUser => oneUser[field] === text);
    return userFound;
  },

  create:function (userData){
    let allUsers = this.findAll();
    let newUser = {
      id: this.genereteId(),
      ...userData
    }
    allUsers.push(newUser);
    fs.writeFileSync(this.usersFilePath,JSON.stringify(allUsers, null, ' '),'utf-8');
    return newUser;
  },

  delete: function(id){
    let allUsers = this.findAll();
    let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
     fs.writeFileSync(this.usersFilePath,JSON.stringify(finalUsers, null, ' '),'utf-8');
    return true;
  }
}

module.exports = User;