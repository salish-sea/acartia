package acartia.sightings;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import lombok.AllArgsConstructor;

import acartia.api.SightingsApi;
import acartia.api.model.Sighting;

@AllArgsConstructor
@Controller
public class SightingsController implements SightingsApi {

    private final SightingsMapper sightingsMapper;

    private final Sightings sightings;

    @Override
    public ResponseEntity<List<Sighting>> getSightings(Optional<LocalDate> startDate, Optional<LocalDate> endDate,
            Optional<List<String>> species, Optional<List<String>> contributors, Optional<Boolean> trusted) {

        return ResponseEntity.ok(sightings.findAll(SightingsFilter.builder()
                .startDate(startDate.orElse(LocalDate.now().minusWeeks(1)))
                .endDate(endDate.orElse(LocalDate.now()))
                .species(species.orElse(List.of()))
                .contributors(contributors.orElse(List.of()))
                .trusted(trusted.orElse(true))
                .build()).stream().map(sightingsMapper::map).toList());
    }
}
