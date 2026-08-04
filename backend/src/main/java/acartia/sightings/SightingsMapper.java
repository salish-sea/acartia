package acartia.sightings;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class SightingsMapper {

    private final SpeciesMapper speciesMapper;

    /**
     * Map {@link acartia.api.model.Sighting} java entity to {@link Sighting} DTO
     * object
     *
     * @param sighting The sighting DTO object.
     * @return The db entity object.
     */
    public Sighting map(acartia.api.model.Sighting sighting) {
        return Sighting.builder()
                .ssemmiId(sighting.getSsemmiId())
                .dataSourceName(sighting.getDataSourceName())
                .dataSourceEntity(sighting.getDataSourceEntity())
                .dataSourceId(sighting.getDataSourceId())
                .created(sighting.getCreated())
                .noSighted(sighting.getNoSighted())
                .latitude(sighting.getLatitude())
                .longitude(sighting.getLongitude())
                .species(speciesMapper.map(sighting.getType()))
                .rawSpecies(sighting.getType())
                .trusted(sighting.getTrusted())
                .dataSourceComments(sighting.getDataSourceComments().orElse(null))
                .build();
    }

    /**
     * Map {@link Sighting} java entity to {@link acartia.api.model.Sighting} DTO
     * object
     *
     * @param sighting The sighting DTO object.
     * @return The db entity object.
     */
    public acartia.api.model.Sighting map(Sighting sighting) {
        String type = sighting.getSpecies() == null ? sighting.getRawSpecies() : sighting.getSpecies().getName();
        return acartia.api.model.Sighting.builder()
                .ssemmiId(sighting.getSsemmiId())
                .dataSourceName(sighting.getDataSourceName())
                .dataSourceEntity(sighting.getDataSourceEntity())
                .dataSourceId(sighting.getDataSourceId())
                .created(sighting.getCreated())
                .noSighted(sighting.getNoSighted())
                .latitude(sighting.getLatitude())
                .longitude(sighting.getLongitude())
                .type(type)
                .trusted(sighting.getTrusted())
                .dataSourceComments(sighting.getDataSourceComments())
                .build();
    }
}
