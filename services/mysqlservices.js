var config = require('../config/development.json');
var dbConfig = config.dbConfiguration;
var mysql = require('mysql');
var con = mysql.createConnection({
    database: dbConfig.dbName,
    host: dbConfig.host,
    password: dbConfig.password,
    user: dbConfig.user
});

function getMaxId() {
    return new Promise(function(resolve,reject) {
        var sql = `SELECT MAX(ID) FROM PERSON;`;
        con.query(sql, function (err, result) {
            if (err) {
                reject(err);
            }
            resolve(result[0]["MAX(ID)"]);
        });
    });
}

var services = {
    insertPerson: function (obj) {
        return new Promise(function(resolve,reject){
            var id = 1;
            getMaxId().then(function (result) {
                    if (result === undefined) {
                        id = 1;
                    } else {
                        id = result;
                    }
                    var sql = `INSERT INTO PERSON VALUES (`+(id+1)+`, '`+obj.name+`','`+obj.email+`','`+obj.password+`')`;
                    con.query(sql, function (err, result) {
                        if (err) {
                            reject(err);
                        }
                        resolve(id+1);
                    });
                }
            ).catch(function(error){
                reject(error);
            });
        });
    },
    getPerson: function(){
        return new Promise(function(resolve,reject){
            var sql = `SELECT * FROM PERSON`;
            con.query(sql, function (err, result) {
                if (err) {
                    throw err;
                }
                resolve(JSON.stringify(result));
            });
        });
    },
    getPersonById: function(id){
        return new Promise(function(resolve,reject){
            var sql = `SELECT * FROM PERSON WHERE ID=`+ id;
            con.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(JSON.stringify(result[0]));
            });
        });
    },
    updatePerson: function(obj){
        return new Promise(function(resolve,reject){
            var i=0;
            var sql = `UPDATE PERSON SET `;
            for (var p in obj) {
                if( obj.hasOwnProperty(p) && (p!=='id')) {
                    if (i===0){
                        sql = sql+` ${p.toUpperCase()}='${obj[p]}'`;
                        i=i+1;
                    } else {
                        sql = sql+`, ${p.toUpperCase()}='${obj[p]}'`;
                    }
                } 
              } 
              sql = sql+ ` WHERE ID=${obj.id}`;
              con.query(sql, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(obj.id);
            });
        })
    }
}


module.exports= services;