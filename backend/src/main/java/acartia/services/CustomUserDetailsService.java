package acartia.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import acartia.repositories.Users;

import acartia.models.User;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private Users users;

    /**
     * Loads user details given a username (email).
     *
     * @param email The email of the user to load.
     * @return The users details.
     */
    public UserDetails loadUserByUsername(String email) {
        User user = users.findByEmail(email).orElseThrow();
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .build();
    }
}
