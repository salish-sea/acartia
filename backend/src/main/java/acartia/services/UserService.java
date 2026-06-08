package acartia.services;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

import acartia.exceptions.EmailAlreadyExistsException;
import acartia.exceptions.NotFoundException;
import acartia.exceptions.UnauthorizedException;
import acartia.models.User;
import acartia.repositories.Users;

@RequiredArgsConstructor
@Service
public class UserService {

    private final PasswordEncoder passwordEncoder;

    private final Users users;

    /**
     * Create a user given a name, email and password.
     *
     * @param name     The name of the user.
     * @param email    The email of the user.
     * @param password The password of the user.
     */
    public void createUser(String name, String email, String password) {

        if (users.existsByEmail(email)) {
            throw new EmailAlreadyExistsException();
        }

        User user = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .build();

        users.save(user);
    }

    /**
     * Gets the currently logged in user. Fetches the full user from the database
     * given the user name retrieved from the Security context.
     *
     * @return The currently logged in user.
     */
    public User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication instanceof AnonymousAuthenticationToken) {
            throw new UnauthorizedException("User is not logged in");
        }

        return users.findByEmail(authentication.getName()).orElseThrow(() -> new NotFoundException("User not found"));
    }
}
