package acartia.sightings;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class SightingsService {

    private final SightingsRepository sightingsRepository;

    private final SpeciesRepository species;

    /**
     * Import new uploaded sightings into the database.
     *
     * @param uploadedSightings The uploaded sightings to import.
     */
    @Transactional
    public void importSightings(List<acartia.api.model.Sighting> uploadedSightings) {
        List<Sighting> newSightings = uploadedSightings.stream()
                .map(sighting -> {
                    Species type = species.findBySynonyms(sighting.getType()).orElse(null);
                    return Sighting.builder()
                            .ssemmiId(sighting.getSsemmiId())
                            .dataSourceName(sighting.getDataSourceName())
                            .dataSourceEntity(sighting.getDataSourceEntity())
                            // Not sure what this is
                            .dataSourceId(sighting.getDataSourceId())
                            .created(sighting.getCreated())
                            .noSighted(sighting.getNoSighted())
                            .latitude(sighting.getLatitude())
                            .longitude(sighting.getLongitude())
                            .species(type)
                            .rawSpecies(sighting.getType())
                            .trusted(true) // TODO: need to add trusted toggle in UI
                            .dataSourceComments(sighting.getDataSourceComments().orElse(null))
                            .build();
                })
                .toList();
        sightingsRepository.saveAllAndFlush(newSightings);
    }

}
