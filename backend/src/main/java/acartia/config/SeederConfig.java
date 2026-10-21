package acartia.config;

import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

import tools.jackson.core.JsonParser;
import tools.jackson.databind.DeserializationContext;
import tools.jackson.databind.deser.std.StdDeserializer;
import tools.jackson.databind.module.SimpleModule;

/**
 * Temporary config for seeding data from the legacy system.
 * If we proceed with this application, this should be replaced with a proper
 * migration.
 */
@Configuration
public class SeederConfig {

    @Bean
    public RestClient legacyRestClient(RestClient.Builder builder, Properties properties) {
        return builder
                .baseUrl(properties.getLegacy().getBaseUrl().toString())
                .build();
    }

    /**
     * Spring Boot auto-detects Module beans and registers them with the
     * ObjectMapper.
     * Handles the legacy API's non-ISO date format "yyyy-MM-dd HH:mm:ss
     *
     *
     * (no timezone),
     * reating it as UTC, while still accepting standard ISO-8601 strings.
     *
     */
    @Bean
    public SimpleModule legacyDateModule() {
        SimpleModule module = new SimpleModule();
        module.addDeserializer(OffsetDateTime.class, new LegacyOffsetDateTimeDeserializer());
        return module;
    }

    static class LegacyOffsetDateTimeDeserializer extends StdDeserializer<OffsetDateTime> {

        private static final DateTimeFormatter LEGACY_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        LegacyOffsetDateTimeDeserializer() {
            super(OffsetDateTime.class);
        }

        @Override
        public OffsetDateTime deserialize(JsonParser p, DeserializationContext ctxt) {
            String value = p.getString();
            try {
                return OffsetDateTime.parse(value);
            } catch (DateTimeParseException e) {
                return LocalDateTime.parse(value, LEGACY_FORMAT).atOffset(ZoneOffset.UTC);
            }
        }
    }
}
