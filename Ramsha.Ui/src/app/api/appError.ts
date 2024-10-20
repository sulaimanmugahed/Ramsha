// utils/AppError.js
class AppError extends Error {
    constructor(message, statusCode, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors; // Array of error objects
    }
}

// Utility function to extract error messages from BaseResult
export const extractErrorMessages = (baseResult) => {
    const errorMessages = [];

    if (!baseResult.Success && Array.isArray(baseResult.Errors)) {
        baseResult.Errors.forEach(({ fieldName, description }) => {
            errorMessages.push({ fieldName, message: description });
        });
    } else {
        errorMessages.push({ message: 'An unexpected error occurred.' });
    }

    return errorMessages;
};

export default AppError;
