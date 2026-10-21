package acartia.profile;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import acartia.api.ProfileApi;
import acartia.api.model.DeleteProfileRequest;
import acartia.api.model.UpdateUserDetailsRequest;
import acartia.api.model.User;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Controller
public class ProfileController implements ProfileApi {

    private final UserProfileService userProfileService;

    private final UserMapper userMapper;

    @Override
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok(userMapper.map(userProfileService.getCurrentUser()));
    }

    @Override
    public ResponseEntity<Void> updateUserDetails(UpdateUserDetailsRequest request) {
        userProfileService.updateUserDetails(request.getName(), request.getEmail(), request.getWebsite().orElse(null));
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity<Void> deleteProfile(DeleteProfileRequest request) {
        return ResponseEntity.ok().build();
    }
}
