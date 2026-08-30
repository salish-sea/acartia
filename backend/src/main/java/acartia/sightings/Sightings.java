package acartia.sightings;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface Sightings extends JpaRepository<Sighting, String>, JpaSpecificationExecutor<Sighting> {
}
