function Db(dbCon){
  this.connection = dbCon;
}

Db.prototype.getCompanies = function(callback){

  var sql = "SELECT * FROM companies;";

  this.connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(null, result);
  });
}

Db.prototype.addCompany = function(callback, company){

  var companyName  = company.company_name,
      companyIP    = company.ip_address,
      companyPort  = (company.port) ? company.port : 22,
      payed        = (company.payed) ? 1 : 0,
      companyHost  = company.hostname,
      companyKey   = company.tls_key,

      sql = `INSERT INTO companies
                   ( ip_address,    port,            company_name,    payed,    hostname,          tls_key )
             VALUES('${companyIP}', ${companyPort}, '${companyName}', ${payed}, '${companyHost}', '${companyKey}');`;

  this.connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(null, result);
  });
}

Db.prototype.editCompany = function(callback, company){

  var companyName   = company.company_name,
      companyIP     = company.ip_address,
      companyPort   = company.port,
      payed         = company.payed,
      id            = company.id,
      companyHost   = company.hostname,
      companyKey    = company.tls_key,

      sql = `UPDATE companies
             SET
             ip_address =   '${companyIP}',
             port =          ${companyPort},
             company_name = '${companyName}',
             payed =         ${payed},
             hostname =      '${companyHost}',
             tls_key  =      '${companyKey}'
             WHERE id =      ${id};`;
      // console.log(sql);
  this.connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(null, result);
  });
}

Db.prototype.deleteCompany = function(callback, id){

  var sql = `INSERT INTO companies_archive (id, ip_address, port, company_name, payed, hostname, tls_key)
             SELECT * FROM companies WHERE id = ${id};
             DELETE FROM companies WHERE id = ${id};`;
          
  this.connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(null, result);
  });
}




module.exports = Db;


/*

[ { name: 'companyName', value: 'qwe' },
  { name: 'companyIP', value: '332' },
  { name: 'companyPort', value: '23' } ]

*/
