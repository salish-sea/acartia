package acartia.config;

import java.net.URI;

import org.springframework.boot.context.properties.ConfigurationProperties;

import lombok.Data;

/**
 * Config properties for Acartia, for now it's just one Giga class to keep it
 * simple
 */
@Data
@ConfigurationProperties(prefix = "acartia")
public class Properties {
    private Legacy legacy;

    /**
     * Properties we need about the legacy system.
     */
    @Data
    public static class Legacy {
        private URI baseUrl;
    }
}
