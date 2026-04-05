package acartia.specifications;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import acartia.models.Sighting;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

import lombok.Builder;

@Builder
public class SightingsFilter implements Specification<Sighting> {

    private final LocalDate startDate;

    private final LocalDate endDate;

    private final List<String> species;

    private final List<String> contributors;

    private final Boolean trusted;

    @Override
    public Predicate toPredicate(Root<Sighting> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicates = new ArrayList<>();
        predicates.add(cb.between(
                root.get("created"),
                startDate.atStartOfDay(ZoneOffset.UTC).toOffsetDateTime(),
                endDate.atStartOfDay(ZoneOffset.UTC).toOffsetDateTime()));

        if (trusted) {
            predicates.add(cb.isTrue(root.get("trusted")));
        }

        if (!contributors.isEmpty()) {
            predicates.add(root.get("dataSourceName").in(contributors));
        }

        if (!species.isEmpty()) {
            predicates.add(root.get("species").get("name").in(species));
        }

        return cb.and(predicates.toArray(new Predicate[0]));
    }
}
