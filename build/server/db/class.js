function Db(dbCon){
  this.connection = dbCon;
}

require("./models/companies")(Db);
require("./models/deployment")(Db);
require("./models/versions")(Db);

module.exports = Db;
