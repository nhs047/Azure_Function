const {
    sequelize
} = require('../dataConnection/index');
const {
    ServerLessPoc
} = require('../dataModel/index');
module.exports = function (context) {
    try {
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
        ServerLessPoc.findAll().then(res => {
            context.res = returnObj(
                200, res
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