var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
module.exports = function (context) {
    var _retArray = [];
try {
        var config = {
            userName: 'nobihossain',
            password: 'Onto@123',
            server: 'serverlesspoc.database.windows.net',
            options: {encrypt: true, database: 'serverless'}
        };
        var connection = new Connection(config);
        connection.on('connect', () => {
            request = new Request("SELECT * FROM ServerLessPoc;", (err)=>{
                if(err) {context.res = returnObj(
                    400, 
                    {
                        message: ex.message
                    }
                );
                context.done();
            }
            });
            request.on('row', function(columns) {
                let singleRecord = {};
                singleRecord.id = columns[0].value;
                singleRecord.firstName = columns[1].value;
                singleRecord.lastName = columns[2].value;
                singleRecord.dateOfBirth = columns[3].value;
                singleRecord.passportId = columns[4].value;
                singleRecord.nId = columns[5].value;
                singleRecord.createdAt = columns[6].value;
                _retArray.push(singleRecord);
            });
            request.on('requestCompleted', () => {
                context.res = returnObj(
                    200, 
                    _retArray
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