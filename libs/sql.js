const { request } = require("express");
var sql = require("mssql/msnodesqlv8");

function connectSQL(cb){
    var config = {
        user: 'sa',
        password: '123456',
        server: 'DESKTOP-4HOPURA\\SQLEXPRESS',
        database: 'Ql_2hand',
        options: {
            trustedConnection: true,
        },
        driver: "msnodesqlv8"
    };
    // connect to your database
    sql.connect(config, function (err, db) {
        if (err) console.log(err);
        // create Request object
        var request = new sql.Request();
        // query to the database and get the records
        // request.query('select * from test', function (err, recordset) {
        //     if (err) console.log(err)
        //     res.send(recordset.recordsets[0]);
        // });
        cb(request);
    });
}

function executeSQL(strSQL, cb){
    connectSQL((request) =>{
        request.query(strSQL, function (err, recordset){
            if(err) console.log(err)
            cb(recordset);
        })
    })
}

function executeSQLP(strSQL) {
    var p = new Promise((resolve,reject)=>{
        connectSQL((request) => {
            request.query(strSQL, function (err, recordset) {
                if (err) console.log(err)
                resolve(recordset);
            });
        });
    });
    return p;  
}

module.exports={
    executeSQL: executeSQL,
    executeSQLP: executeSQLP
}