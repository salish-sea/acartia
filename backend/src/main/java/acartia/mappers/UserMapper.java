package acartia.mappers;

import org.springframework.stereotype.Component;

import acartia.models.User;

@Component
public class UserMapper {

    /**
     * Map {@link User} db entity to {@link acartia.api.model.User} DTO object.
     *
     * @param user The {@link User} to map.
     * @return The mapped {@link acartia.api.model.User}
     */
    public acartia.api.model.User map(User user) {
        return acartia.api.model.User.builder()
                .name(user.getName())
                .email(user.getEmail())
                .isApproved(user.isApproved())
                .build();
    }
}
