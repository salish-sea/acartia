package acartia.sightings;

import java.io.IOException;
import java.time.OffsetDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.MappingIterator;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.core.JacksonException;

import java.time.LocalDateTime;

import acartia.api.model.Sighting;

public class SightingsParser {

    /**
     * Parse a {@link MultipartFile} into a list of sightings using jackson.
     *
     * @param file The (CSV) file to parse.
     * @return A list of Sightings.
     * @throws IOException If it didn't work.
     */
    public static List<Sighting> parse(MultipartFile file) throws IOException {
        // TODO: make this more robust, consider using a different DTO than the sighting
        // one. Look at the old code
        CsvMapper csvMapper = new CsvMapper();
        JavaTimeModule timeModule = new JavaTimeModule();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        timeModule.addDeserializer(
                OffsetDateTime.class,
                new JsonDeserializer<OffsetDateTime>() {
                    @Override
                    public OffsetDateTime deserialize(JsonParser p, DeserializationContext ctxt)
                            throws IOException, JacksonException {

                        LocalDateTime dateTime = LocalDateTime.parse(p.getText(), formatter);
                        return dateTime.atZone(ZoneId.of("America/Los_Angeles")).toOffsetDateTime();
                    }
                });

        csvMapper.registerModule(timeModule);
        csvMapper.registerModule(new Jdk8Module());
        CsvSchema schema = CsvSchema.emptySchema().withHeader();
        MappingIterator<Sighting> sightings = csvMapper.readerFor(Sighting.class)
                .with(schema)
                .readValues(file.getInputStream());

        return sightings.readAll();
    }
}
