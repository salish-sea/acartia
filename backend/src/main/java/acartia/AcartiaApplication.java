package acartia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class AcartiaApplication {

    public static void main(String[] args) {
        SpringApplication.run(AcartiaApplication.class, args);
    }
}
