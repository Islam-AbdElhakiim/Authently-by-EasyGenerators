// exception-filters/mongoose-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class MongooseExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        // console.log('🔍 EXCEPTION DEBUG:');
        // console.log('Exception type:', typeof exception);
        // console.log('Exception constructor:', exception.constructor?.name);
        // console.log('Exception keys:', Object.keys(exception));
        // console.log('Exception name:', exception.name);
        // console.log('Exception message:', exception.message);
        // console.log('Exception code:', exception.code);
        // console.log('Exception status:', exception.status);
        // console.log('Exception response:', exception.response);
        // console.log('Exception cause:', exception.cause);
        // console.log('Full exception:', exception);
        // console.log('-------------------');

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let code = 500;
        let message = 'Internal server error';

        // Handle custom Authently errors first
        const { authentlyError, ...customError } = exception.response || {};
        if (authentlyError) {
            return response.json(customError);
        }

        // Handle NestJS HTTP Exceptions (like UnauthorizedException, BadRequestException, etc.)
        if (exception instanceof HttpException) {
            code = exception.getStatus();
            const response = exception.getResponse();

            // If response is an object, extract message; if string, use as is
            if (typeof response === 'object' && response['message']) {
                message = Array.isArray(response['message'])
                    ? response['message'].join(', ')
                    : response['message'];
            } else if (typeof response === 'string') {
                message = response;
            } else {
                message = exception.message;
            }
        }
        // MongoDB Unique Constraint Error - check both exception and cause
        else if (exception.code === 11000 || exception.cause?.code === 11000) {
            const mongoError = exception.cause || exception;
            code = 409;
            const field = Object.keys(mongoError.keyPattern)[0];
            const value = mongoError.keyValue[field];
            message = `${field} '${value}' already exists`;
        }
        // Mongoose Validation Error
        else if (exception.name === 'ValidationError') {
            code = 400;
            const errors = Object.values(exception.errors).map((err: any) => err.message);
            message = errors.join(', ');
        }
        // Mongoose wrapper errors (like your current case)
        else if (exception.name === 'MongooseError' && exception.cause?.code === 11000) {
            code = 409;
            const cause = exception.cause;
            const field = Object.keys(cause.keyPattern)[0];
            const value = cause.keyValue[field];
            message = `${field} '${value}' already exists`;
        }
        // Cast Error
        else if (exception.name === 'CastError') {
            code = 400;
            message = `Invalid ${exception.path}: ${exception.value}`;
        }
        // Generic Mongoose errors with readable messages
        else if (exception.name === 'MongooseError') {
            code = 400;
            message = exception.message || 'Database operation failed';
        }

        response.status(code).json({
            success: false,
            code,
            message,
            timestamp: new Date().toISOString(),
        });
    }
}