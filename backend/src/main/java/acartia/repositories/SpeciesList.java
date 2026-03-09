package acartia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import acartia.models.Species;

public interface SpeciesList extends JpaRepository<Species, String> {

    /**
     * Lookup if a species exists by name.
     *
     * @param name The species name.
     * @return Whether that species exists.
     */
    Boolean existsByName(String name);
}
