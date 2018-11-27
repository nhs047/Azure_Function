const {
    sequelize
} = require('../dataConnection/index');
const {
    ServerLessPoc
} = require('../dataModel/index');
module.exports = function (context, req) {
    try {
        var fields = ["firstName", "lastName", "dateOfBirth", "passportId", "nId"];
        var retObj = {};
        for (var prop in req.body) {
            if (fields.indexOf(prop) != -1) retObj[prop] = req.body[prop];
        }

        sequelize.authenticate().then(() => {
            console.log('connection successfull');
        }).catch(err => {
            context.res = returnObj(
                400, {
                    message: err.message
                }
            );
            context.done();
        });
        ServerLessPoc.sync({
            force: false
        }).then(() => {
            ServerLessPoc.create(retObj).then(() => {

                context.res = returnObj(
                    200,
                    retObj
                );
                context.done();
            }).catch(err => {
                context.res = returnObj(
                    400, {
                        message: err.message
                    }
                );
                context.done();
            })
        })
    } catch (ex) {
        context.res = returnObj(
            400, {
                message: ex.message
            }
        );
        context.done();

    }

    returnObj = (status, body) => {
        return {
            status,
            body,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
};