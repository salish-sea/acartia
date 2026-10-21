package acartia.security;

import java.util.ArrayList;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import acartia.profile.User;
import acartia.profile.Users;
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
        User user = users.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found " + email));

        return CustomUserDetails.builder()
                .id(user.getId())
                .username(user.getEmail())
                .password(user.getPassword())
                .authorities(new ArrayList<>())
                .build();
    }
}
