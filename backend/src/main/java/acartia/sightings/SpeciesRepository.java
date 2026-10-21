package acartia.sightings;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SpeciesRepository extends JpaRepository<Species, Integer> {

    /**
     * Lookup if a species exists by name.
     *
     * @param name The species name.
     * @return Whether that species exists.
     */
    Boolean existsByName(String name);

    /**
     * Find a species by name.
     *
     * @param name The name to fetch by.
     * @return The species if it exists.
     */
    Optional<Species> findByName(String name);

    /**
     * Find a sighting type / species by an alternate name.
     *
     * @param synonym The alternate name for the species type
     *                e.g. "Killer whale" -> "Orca"
     * @return The species entry.
     */
    Optional<Species> findBySynonyms(String synonym);
}
