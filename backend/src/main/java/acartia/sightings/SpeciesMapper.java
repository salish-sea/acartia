package acartia.sightings;

import org.springframework.stereotype.Component;

/**
 * Temporary mapper that normalises legacy API type strings to canonical species
 * names. When the application goes live, species will be managed by the admin
 * and this class can be removed. Maybe this shouold move to /migration/mappers
 */
@Component
public class SpeciesMapper {

    public Species map(String type) {
        String name = switch (type == null ? "" : type.toLowerCase().strip()) {
            case "orca", "orca sighting:", "orca (ballena asesina)",
                    "killer whale", "killer whale sighting:",
                    "killer whale (orca)", "killer whale (orca) sighting:" ->
                "orca";
            case "southern resident killer whale", "southern resident killer whale sighting:",
                    "southern resident orca" ->
                "southern resident killer whale";
            case "humpback", "humpback sighting:", "humpback whale",
                    "humpback_whale", "ballena jorobada" ->
                "humpback whale";
            case "gray", "grey", "gray whale", "grey whale", "gray whale sighting:", "grey whale sighting:" ->
                "gray whale";
            case "fin whale", "fin whale sighting:", "finback whale" -> "fin whale";
            case "minke", "minke whale", "minke whale sighting:", "minke_whale",
                    "petit rorqual", "balaenoptera acutorostrata" ->
                "minke whale";
            case "sei whale" -> "sei whale";
            case "blue whale", "blue whale sighting:", "ballena azul" -> "blue whale";
            case "right whale", "right whale sighting:", "black right whale" -> "right whale";
            case "sperm whale", "sperm whale sighting:" -> "sperm whale";
            case "dwarf sperm whale" -> "dwarf sperm whale";
            case "pygmy sperm whale" -> "pygmy sperm whale";
            case "short finned pilot whale", "short finned pilot whale sighting:" -> "short-finned pilot whale";
            case "beluga", "beluga whale", "beluga whale sighting:" -> "beluga whale";
            case "baird's beaked whale" -> "baird's beaked whale";
            case "sowerby's beaked whale" -> "sowerby's beaked whale";
            case "bottlenose whale" -> "bottlenose whale";
            case "unidentified whale", "whale - unidentified" -> "unidentified whale";
            case "harbor porpoise", "harbour porpoise", "harbor_porpoise",
                    "marsouin commun", "phocoena phocoena" ->
                "harbor porpoise";
            case "dall's porpoise", "dall\\'s porpoise", "dalls porpoise",
                    "dall porpoise", "phocoenoides dalli" ->
                "dall's porpoise";
            case "bottlenose dolphin" -> "bottlenose dolphin";
            case "common dolphin", "common dolphin - unidentified", "common dolphin sighting:" -> "common dolphin";
            case "common long-beaked dolphin", "long-beaked common dolphin" -> "long-beaked common dolphin";
            case "common short-beaked dolphin" -> "short-beaked common dolphin";
            case "pacific white-sided dolphin", "pacific white-sided dolphin sighting:" ->
                "pacific white-sided dolphin";
            case "atlantic white-sided dolphin", "atlantic white-sided dolphin sighting:" ->
                "atlantic white-sided dolphin";
            case "northern right whale dolphin", "northern right whale dolphin sighting:" ->
                "northern right whale dolphin";
            case "risso's dolphin", "risso's dolphin sighting:", "risso\\'s dolphin" -> "risso's dolphin";
            case "striped dolphin" -> "striped dolphin";
            case "harbor seal", "harbour seal", "harbor_seal", "phoca vitulina" -> "harbor seal";
            case "steller sea lion", "steller_sea_lion", "steller sealion",
                    "eumetopias jubatus" ->
                "steller sea lion";
            case "california sea lion", "california_sea_lion", "zalophus californianus" -> "california sea lion";
            case "elephant seal", "northern elephant seal", "mirounga angustirostris" -> "elephant seal";
            case "blue shark" -> "blue shark";
            case "mola mola / sunfish" -> "mola mola";
            case "unknown", "unspecified", "unspecified sighting:",
                    "other", "other sighting:", "other species",
                    "other (specify in comments)", "other (specify in comments) sighting:",
                    "no especificado", "non spécifié", "non spã©cifiã©",
                    "autre" ->
                "other";
            default -> "other"; // pass through unknown types as-is
        };

        return Species.builder().name(name).build();
    }
}
