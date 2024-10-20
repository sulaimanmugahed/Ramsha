// utils/AppError.ts

import { BaseError } from '../models/common/commonModels'

class ApiValidationError extends Error {
    public readonly errors: BaseError[];

    constructor(errors: BaseError[] = []) {
        super("Validation Errors");
        this.errors = errors;
    }
}

export default ApiValidationError;
