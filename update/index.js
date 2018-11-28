const {
    sequelize
} = require('../database/dataConnection');
const {
    ServerLessPoc
} = require('../database/dataModel');
module.exports = function (context, req) {
    try {
        var fields = ["firstName", "lastName", "dateOfBirth", "passportId", "nId"];
        var retObj = {};
        for (var prop in req.body) {
            if (fields.indexOf(prop) != -1) retObj[prop] = req.body[prop];
        }
        if (retObj.dateOfBirth) retObj.dateOfBirth = `${new Date(dateOfBirth).toISOString.split(0,10)}`;
        if (!req.params.id) {
            context.res = returnObj(
                400, {
                    message: ex.message
                }
            );
            context.done();
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
        // Project.update(
            //     { title: 'a very different title now' },
            //     { where: { _id: 1 } }
            //   )
            //     .then(result =>
            //       handleResult(result)
            //     )
            //     .catch(err =>
            //       handleError(err)
            //     )
        ServerLessPoc.update(retObj,{
            where:{id:req.params.id}
        }).then(()=>{
            context.res = returnObj(
                200, retObj
            );
            context.done();
        }).catch(err =>{
            context.res = returnObj(
                400,{
                    message:err.message
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