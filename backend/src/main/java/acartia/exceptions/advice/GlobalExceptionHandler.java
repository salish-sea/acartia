package acartia.exceptions.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import acartia.api.model.ApiError;
import acartia.exceptions.EmailAlreadyExistsException;
import acartia.exceptions.NotFoundException;
import acartia.exceptions.UnauthorizedException;

@ControllerAdvice
class GlobalExceptionHandler {

    /**
     * Returns "bad request" http response for {@link EmailAlreadyExistsException}.
     */
    @ExceptionHandler(value = { EmailAlreadyExistsException.class, IllegalStateException.class })
    public ResponseEntity<ApiError> badRequest(Exception exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiError.builder().error("Bad Request").status(400).message(exception.getMessage()).build());
    }

    /**
     * Returns "unauthorized" http response for {@link AuthenticationException}.
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ApiError> unauthorized(Exception exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(ApiError.builder().error("Unauthorized").status(401).message(exception.getMessage()).build());
    }

    /**
     * Returns "not found" http response for {@link NotFoundException}.
     */
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiError> notFound(Exception exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiError.builder().error("Not Found").status(404).message(exception.getMessage()).build());
    }
}
