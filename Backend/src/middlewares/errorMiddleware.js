const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Some error occured";
    err.status = err.statusCode || 500;

    return res.status(err.status).json({
        success : false,
        message : err.message,
        error : err
    })
}

export default errorMiddleware;