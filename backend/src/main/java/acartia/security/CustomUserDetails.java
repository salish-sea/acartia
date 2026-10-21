package acartia.security;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Builder;
import lombok.Data;

/*
 * A custom {@link UserDetails} for our app. We need this because we need to store the id here,
 *  which the default spring security User doesn't have. We need to store the id here because
 * the GET /profile endpoint cannot rely on the email, which may changea fter the session token
 * is issued.
 */
@Builder
@Data
public class CustomUserDetails implements UserDetails {

    private Integer id;

    private String username;

    private String password;

    private List<GrantedAuthority> authorities;
}
