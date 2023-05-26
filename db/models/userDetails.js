const { Model} = require('sequelize');

module.exports=(sequelize,DataTypes)=>{
class User extends Model {
  static associate(models) {
    // define association here
    
  }

}

User.init({
  // Model attributes are defined here
  
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },email:{
    type: DataTypes.STRING,
    allowNull: false

  },password:{
    type: DataTypes.STRING,
    allowNull: false
  },phno:{
    type: DataTypes.STRING,
    allowNull:false
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'UserDetails' // We need to choose the model name
});
return User;
}