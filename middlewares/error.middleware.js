const errorMiddleware = (err, req, res, next) => {
    try{
        let error = {...err};
        error.message = err.message;

        console.error(error);

        if(error.name === 'CastError') {
            error = new Error('Resource not found');
            error.statusCode = 404;
        }

        //duplicate field value error
        if(error.code === 11000) {
            error = new Error('Duplicate field value entered');
            error.statusCode = 400;
        }

        //validation error
        if(error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(val => val.message).join(', ');
            error = new Error(message);
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    } catch (error) {
        next(error);
    }
};

export default errorMiddleware;