const HttpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
}

const errorsDictionary = {
    NOT_FOUND: 'Not found',
    OK: 'Success',
    CREATED: 'Created',
    NO_CONTENT: 'No content',
    BAD_REQUEST: 'Bad request',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    NOT_FOUND: 'Not found',
    CONFLICT: 'Conflict',
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    SERVICE_UNAVAILABLE: 'Service unavailable'
}

export class HttpResponse {
    Ok(res, data){
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: errorsDictionary.OK,
            data
        })
    }

    Created(res,data){
        return res.status(HttpStatus.CREATED).json({
            status: HttpStatus.CREATED,
            message: errorsDictionary.CREATED,
            data
        })
    }

    NoContent(res,data){
        return res.status(HttpStatus.NO_CONTENT).json({
            status: HttpStatus.NO_CONTENT,
            message: errorsDictionary.NO_CONTENT,
            error: data
        })
    }

    BadRequest(res,data){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: errorsDictionary.BAD_REQUEST,
            error: data
        })
    }

    Unauthorized(res,data){
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: errorsDictionary.UNAUTHORIZED,
            error: data
        })
    }

    Forbidden(res,data){
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: errorsDictionary.FORBIDDEN,
            error: data
        })
    }
    NotFound(res,data){
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: errorsDictionary.NOT_FOUND,
            error: data
        })
    }

    Conflict(res,data){
        return res.status(HttpStatus.CONFLICT).json({
            status: HttpStatus.CONFLICT,
            message: errorsDictionary.CONFLICT,
            error: data
        })
    }

    ServerError(res,data){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: errorsDictionary.INTERNAL_SERVER_ERROR,
            error: data
        })
    }

    ServiceUnavailable(res,data){
        return res.status(HttpStatus.SERVICE_UNAVAILABLE).json({
            status: HttpStatus.SERVICE_UNAVAILABLE,
            message: errorsDictionary.SERVICE_UNAVAILABLE,
            error: data
        })
    }


}