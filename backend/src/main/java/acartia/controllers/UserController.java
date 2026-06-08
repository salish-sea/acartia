package acartia.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import acartia.api.UserApi;
import acartia.api.model.User;
import acartia.mappers.UserMapper;
import acartia.services.UserService;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Controller
public class UserController implements UserApi {

    private final UserService userService;

    private final UserMapper userMapper;

    @Override
    public ResponseEntity<User> getCurrentUser() {
        return ResponseEntity.ok(userMapper.map(userService.getCurrentUser()));
    }
}
