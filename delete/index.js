var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
module.exports = function (context,req) {
try {
        var config = {
            userName: 'nobihossain',
            password: 'Onto@123',
            server: 'serverlesspoc.database.windows.net',
            options: {encrypt: true, database: 'serverless'}
        };
        var connection = new Connection(config);
        connection.on('connect', () => {
            request = new Request(`DELETE FROM ServerLessPoc WHERE id = ${req.params.id};`, (err)=>{
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
                    {isDeleted: true}
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