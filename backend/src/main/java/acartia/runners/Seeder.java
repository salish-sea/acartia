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
import acartia.sightings.Sighting;
import acartia.sightings.Sightings;
import acartia.sightings.SightingsMapper;
import acartia.sightings.Species;
import acartia.sightings.SpeciesList;
import acartia.sightings.SpeciesMapper;

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

        // TODO: Don't do this in the real migration - there should be an admin page
        // that controls this :)
        log.info("Mapping types to species columns");
        Set<Species> seededSpecies = legacySightings.stream()
                .map(acartia.api.model.Sighting::getType)
                .map(speciesMapper::map)
                .collect(Collectors.toSet());

        species.saveAllAndFlush(seededSpecies);

        log.info("Seeding database");
        List<Sighting> seededSightings = legacySightings.stream().map(sightingsMapper::map).toList();
        sightings.saveAllAndFlush(seededSightings);
        log.info("Successfully seeded database");
    }
}
