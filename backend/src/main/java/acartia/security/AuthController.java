package acartia.security;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;

import acartia.api.AuthApi;
import acartia.api.model.RegisterRequest;
import acartia.api.model.SignInRequest;
import acartia.exceptions.UnauthorizedException;
import acartia.profile.UserProfileService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@AllArgsConstructor
@Controller
public class AuthController implements AuthApi {

    private final AuthenticationManager authenticationManager;

    private final SecurityContextRepository securityContextRepository;

    private final HttpServletRequest request;

    private final HttpServletResponse response;

    private final SecurityContextHolderStrategy securityContextHolderStrategy = SecurityContextHolder
            .getContextHolderStrategy();

    private final UserProfileService userService;

    @Override
    public ResponseEntity<Void> signIn(SignInRequest signInRequest) {
        try {
            UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken
                    .unauthenticated(signInRequest.getUsername(), signInRequest.getPassword());
            Authentication authentication = authenticationManager.authenticate(token);
            SecurityContext context = securityContextHolderStrategy.createEmptyContext();
            context.setAuthentication(authentication);
            securityContextHolderStrategy.setContext(context);
            securityContextRepository.saveContext(context, request, response);
            return ResponseEntity.ok().build();
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("The email and/or password you entered did not match our records");
        }

    }

    @Override
    public ResponseEntity<Void> register(RegisterRequest registerRequest) {
        userService.createUser(registerRequest.getName(), registerRequest.getEmail(), registerRequest.getPassword());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
