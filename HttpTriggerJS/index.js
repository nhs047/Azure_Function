module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: {message: "Hello " + (req.query.name || req.body.name)},
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    else {
        context.res = {
            status: 400,
            body: {message: "Please pass a name on the query string or in the request body"},
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    context.done();
};