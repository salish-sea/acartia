package acartia.sightings;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * This class is for cron jobs for loading data from other places.
 */
@Slf4j
@Component
@AllArgsConstructor
public class LegacySiteSeeder {

    private final SpeciesRepository speciesRepository;

    private final SightingsRepository sightingsRepository;

    private final RestClient restClient;

    @Scheduled(cron = "0 0 0 * * SUN")
    public void weekly() {
        loadFromActualAcartia();
    }

    /**
     * Load data from acartia.io app. If this application ever becomes the real
     * acartia backend, I suppose this can be deleted.
     */
    public void loadFromActualAcartia() {
        log.info("Fetching sightings from legacy system to seed into database");
        List<Sighting> newSightings = new ArrayList<>();
        try {
            ParameterizedTypeReference<List<acartia.api.model.Sighting>> parameterizedTypeReference = new ParameterizedTypeReference<List<acartia.api.model.Sighting>>() {
            };

            List<acartia.api.model.Sighting> sightings = restClient.get()
                    .uri("/sightings/current")
                    .retrieve()
                    .body(parameterizedTypeReference);

            for (var sighting : sightings) {
                if (!sightingsRepository.existsById(sighting.getEntryId())) {
                    Optional<Species> type = speciesRepository.findBySynonyms(sighting.getType());
                    Sighting newSighting = Sighting.builder()
                            .entryId(sighting.getEntryId())
                            .ssemmiId(sighting.getSsemmiId())
                            .dataSourceName(sighting.getDataSourceName())
                            .dataSourceEntity(sighting.getDataSourceEntity())
                            .dataSourceWitness(sighting.getDataSourceWitness())
                            .dataSourceId(sighting.getDataSourceId())
                            .created(sighting.getCreated())
                            .noSighted(sighting.getNoSighted())
                            .latitude(sighting.getLatitude())
                            .longitude(sighting.getLongitude())
                            .species(type.orElse(null))
                            .rawSpecies(sighting.getType())
                            .trusted(sighting.getTrusted())
                            .dataSourceComments(sighting.getDataSourceComments().orElse(null))
                            .photoUrl(sighting.getPhotoUrl().orElse(null))
                            .build();
                    newSightings.add(newSighting);
                } else {
                    log.warn("Sighting with entry id {} already exists", sighting.getEntryId());
                }
            }

            if (!newSightings.isEmpty()) {
                sightingsRepository.saveAll(newSightings);
                log.info("Successfully inserted {} new sightings", newSightings.size());
            } else {
                log.info("No new sightings retrieved from the legacy system");
            }
        } catch (Exception e) {
            log.error("Failed to insert {} new sightings from the legacy system", newSightings.size(), e);
        }
    }
}
