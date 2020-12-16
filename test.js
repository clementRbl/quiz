const dotenv = require("dotenv");
dotenv.config();
const sequelize = require('./app/database');

const {Question, Answer} = require('./app/models');

//  sequelize.authenticate().then(() => {
//    console.log('Connection has been etablished successfully');
//  }).catch(() => {
//    console.error('Unable to connect to the database:', errror);
//  })

  Answer.findByPk(2).then((answer) => {
    console.log(answer.description);
  })
 
