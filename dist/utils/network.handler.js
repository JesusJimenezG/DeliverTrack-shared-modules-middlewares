"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const success = (res, data, status) => {
    const _status = status || 200;
    const _data = { data: data || 'Success' };
    res.status(_status).json(_data);
};
const error = (res, error, status) => {
    const _status = status || 500;
    const _error = handleErrorMessage(error) || {
        Error: 'Internal server error'
    };
    res.status(_status).json(_error);
};
const handleErrorMessage = (error) => {
    let _error;
    if (error instanceof Error) {
        _error = { Error: error.message };
    }
    return _error;
};
exports.default = {
    success,
    error
};
