const dotenv = require("dotenv");
dotenv.config();
const sequelize = require('./app/database');

const User = require('./app/models/User');

//  sequelize.authenticate().then(() => {
//    console.log('Connection has been etablished successfully');
//  }).catch(() => {
//    console.error('Unable to connect to the database:', errror);
//  })

User.findByPk(3).then((user) => {
  console.log(user);
});
  
 
