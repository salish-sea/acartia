package acartia.sightings;

import java.math.BigDecimal;
import java.time.OffsetDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "sightings")
public class Sighting {

    @Id
    private String entryId;

    private String ssemmiId;

    private String dataSourceName;

    private String dataSourceEntity;

    private String dataSourceWitness;

    private Integer dataSourceId;

    private OffsetDateTime created;

    private Integer noSighted;

    private BigDecimal latitude;

    private BigDecimal longitude;

    @ManyToOne
    @JoinColumn(name = "species_id")
    private Species species;

    private String rawSpecies;

    private Boolean trusted;

    private String dataSourceComments;

    private String photoUrl;
}
