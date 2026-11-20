const errorMidddleware = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server error'
    });
};

export default errorMidddleware;