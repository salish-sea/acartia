package acartia.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import acartia.models.User;

public interface Users extends JpaRepository<User, Integer> {

    /**
     * Find a user given an email.
     *
     * @param email The email of the user to retrieve.
     * @return The user's db entity.
     */
    Optional<User> findByEmail(String email);

    /**
     * Returns true if a user already exists for the given email.
     *
     * @param email The email to check.
     * @return Whether the provided email is already registered.
     */
    boolean existsByEmail(String email);
}
