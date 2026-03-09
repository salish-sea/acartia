package acartia.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import acartia.models.Sighting;

public interface Sightings extends JpaRepository<Sighting, String>, JpaSpecificationExecutor<Sighting> {
}
