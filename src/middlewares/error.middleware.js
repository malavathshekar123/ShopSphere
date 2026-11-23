const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack || err);

    if (res.headersSent) {
        return next(err);
    }

    const statusCode =
        Number.isInteger(err.statusCode) &&
        err.statusCode >= 400 &&
        err.statusCode <= 599
            ? err.statusCode
            : 500;

    const message =
        statusCode < 500
            ? err.message || 'Request failed'
            : 'Internal Server Error';

    return res.status(statusCode).json({
        success: false,
        message
    });
};

export default errorMiddleware;