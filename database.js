var mongoose = require('mongoose');
var constants=require('../constants')
mongoose.connect(constants.dbConn,{ useNewUrlParser: true });
class Database {
    constructor() {
      this.connect()
    }
   connect(){
    mongoose.connect(constants.dbConn,{ useNewUrlParser: true })
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })
  }
}
module.exports = new Database()