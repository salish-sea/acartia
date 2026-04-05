package acartia.runners;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import acartia.mappers.SightingsMapper;
import acartia.mappers.SpeciesMapper;
import acartia.models.Sighting;
import acartia.models.Species;
import acartia.repositories.Sightings;
import acartia.repositories.SpeciesList;

@Slf4j
@Component
@AllArgsConstructor
public class Seeder implements ApplicationRunner {

    private final SpeciesList species;

    private final Sightings sightings;

    private final RestClient restClient;

    private final SightingsMapper sightingsMapper;

    private final SpeciesMapper speciesMapper;

    /**
     * Temporary Runner that seeds our testcontainers database with sightings from
     * the old system
     * Will need to do a proper migration and not this.
     */
    @Override
    public void run(ApplicationArguments args) {
        log.info("Fetching sightings from legacy system to seed into database");

        ParameterizedTypeReference<List<acartia.api.model.Sighting>> parameterizedTypeReference = new ParameterizedTypeReference<List<acartia.api.model.Sighting>>() {
        };

        List<acartia.api.model.Sighting> legacySightings = restClient.get()
                .uri("/sightings/current")
                .retrieve()
                .body(parameterizedTypeReference);

        log.info("Mapping types to species columns");
        Set<Species> seededSpecies = legacySightings.stream().map(s -> s.getType()).map(speciesMapper::map)
                .collect(Collectors.toSet());
        species.saveAll(seededSpecies);

        log.info("Seeding database");
        List<Sighting> seededSightings = legacySightings.stream().map(sightingsMapper::map).toList();
        sightings.saveAll(seededSightings);
        log.info("Successfully seeded database");
    }
}
