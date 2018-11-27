const {
    sequelize
} = require('../dataConnection/index');
const {
    ServerLessPoc
} = require('../dataModel/index');
module.exports = function (context, req) {
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
        ServerLessPoc.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            context.res = returnObj(
                200, {
                    isDeleted: true
                }
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
        // connection.on('connect', () => {
        //     request = new Request(`DELETE FROM ServerLessPoc WHERE id = ${req.params.id};`, (err) => {
        //         if (err) {
        //             context.res = returnObj(
        //                 400, {
        //                     message: err.message
        //                 }
        //             );
        //             context.done();
        //         }
        //     });

        //     request.on('requestCompleted', () => {
        //         context.res = returnObj(
        //             200, {
        //                 isDeleted: true
        //             }
        //         );
        //         context.done();
        //     })
        //     connection.execSql(request);
        // });
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