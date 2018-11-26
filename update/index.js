var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
module.exports = function (context,req) {
try {
        var fields = ["firstName","lastName","dateOfBirth","passportId","nId"];
        var retObj = {};
        for (var prop in req.body) {
          if (fields.indexOf(prop) != -1) retObj[prop] = req.body[prop];
        }
        var updatePhrese = "";
        var keys = Object.keys(retObj);
        for(var i=0; i<keys.length;i++){
            updatePhrese += ` ${keys[i]}='${retObj[keys[i]]}'`;
            if(i!=keys.length-1) updatePhrese +=`,`;
        }
        if(keys.length<1) {
            context.res = returnObj(
                400, 
                {
                    message: 'No Update Found!'
                }
            );
            context.done();
        }     
        var config = {
            userName: 'nobihossain',
            password: 'Onto@123',
            server: 'serverlesspoc.database.windows.net',
            options: {encrypt: true, database: 'serverless'}
        };
        var connection = new Connection(config);
        connection.on('connect', () => {
            request = new Request(`UPDATE ServerLessPoc SET${updatePhrese} WHERE id = ${req.params.id};`, (err)=>{
                if(err) {context.res = returnObj(
                    400, 
                    {
                        message: err.message
                    }
                );
                context.done();
            }
            });
            
            request.on('requestCompleted', () => {
                context.res = returnObj(
                    200, 
                    retObj
                );
                context.done();
            })
            connection.execSql(request);
        });
    }
    catch (ex) {
        context.res = returnObj(
            400, 
            {
                message: ex.message
            }
        );
    context.done();

    }

    returnObj = (status, body) => {
        return {
                status,
                body,
                headers : {
                    'Content-Type': 'application/json'
                }
        }
    }
};