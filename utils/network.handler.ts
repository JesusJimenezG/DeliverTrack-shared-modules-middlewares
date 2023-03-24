import { Response } from 'express';

const success = (res: Response, data?: string | unknown, status?: number) => {
    const _status = status || 200;
    const _data = { data: data || 'Success' };
    res.status(_status).json(_data);
};

const error = (res: Response, error?: unknown, status?: number) => {
    const _status = status || 500;
    const _error = handleErrorMessage(error) || {
        Error: 'Internal server error'
    };
    res.status(_status).json(_error);
};

const handleErrorMessage = (
    error: Error | unknown
) => {
    let _error;

    if (error instanceof Error) {
        _error = { Error: error.message };
    }

    return _error;
};

export default {
    success,
    error
};
