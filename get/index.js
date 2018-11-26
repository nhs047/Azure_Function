var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
module.exports = function (context) {
    var _retArray = [];
    var _currentData = {};
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
                _currentData.id = columns[0].value;
                _currentData.firstName = columns[1].value;
                _currentData.lastName = columns[2].value;
                _currentData.dateOfBirth = columns[3].value;
                _currentData.passportId = columns[4].value;
                _currentData.nId = columns[5].value;
                _currentData.createdAt = columns[6].value;
                _retArray.push(_currentData);
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