package acartia.profile;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import acartia.exceptions.EmailAlreadyExistsException;
import acartia.exceptions.NotFoundException;
import acartia.exceptions.UnauthorizedException;
import acartia.security.CustomUserDetails;

@RequiredArgsConstructor
@Service
public class UserProfileService {

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
            throw new NotFoundException("User not found");
        }

        CustomUserDetails principal = (CustomUserDetails) authentication.getPrincipal();
        return users.findById(principal.getId()).orElseThrow(() -> new NotFoundException("User not found"));
    }

    /**
     * TODO TOM DO THESE THINGS IT IS IMPORTANT
     * [ ] - "DELETE YOUR ACCOUNT" text is not responsive.
     * route. This route is only accessible from mobile and is useful because we
     * cant show the usual side-nav.
     */

    /**
     * Update the requesting users details.
     *
     * @param name    The name to update to.
     * @param email   The email to update to.
     * @param website The webaite to update to.
     */
    public void updateUserDetails(String name, String email, String website) {

        if (name == null || name.isBlank() || email == null || email.isBlank()) {
            throw new IllegalStateException("Name and Email cannot be empty");
        }

        User user = getCurrentUser();
        user.setName(name.trim());
        user.setEmail(email.trim());
        user.setWebsite(website);
        users.save(user);
    }

    /**
     * Delete the requesting users password.
     *
     * @param password The requesting users password. Must match what we have stored
     *                 for this to succeed.
     */
    public void delete(String password) {
        User user = getCurrentUser();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new UnauthorizedException("Password is incorrect");
        }

        users.delete(user);
    }
}
