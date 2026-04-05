package acartia.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestClient;

import jakarta.servlet.http.HttpServletRequest;

import lombok.AllArgsConstructor;

import acartia.api.AuthApi;
import acartia.api.model.AuthResponse;
import acartia.api.model.SignInRequest;

@AllArgsConstructor
@Controller
public class AuthController implements AuthApi {

    private final HttpServletRequest request;

    private final RestClient restClient;

    @Override
    public ResponseEntity<AuthResponse> signIn(SignInRequest signInRequest) {
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        return ResponseEntity.ok(
                restClient.post()
                        .uri("/auth")
                        .header(HttpHeaders.AUTHORIZATION, authHeader)
                        .body(signInRequest)
                        .retrieve()
                        .body(AuthResponse.class));
    }
}
