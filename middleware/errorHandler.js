
const {constant} = require("../constant");

const errorHandler = (err , req , res ,next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constant.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
        break;
        case constant.NOT_FOUND:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
        break;

        case constant.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
        break;

        case constant.UNAUTORIZED:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
        break;
        default:
            console.log("No Error, ALL GOOD!!");
        break;
    }
}
module.exports = errorHandler;