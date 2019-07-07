module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    if (typeof err === 'string') {
        return res.status(400).json({ 
            _error_message: err,
            _error_type: 123
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.status(500).json({ 
        _error_message: err.message,
        _error_type: 123
    });
}