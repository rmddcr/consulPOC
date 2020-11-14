package damitha.ranasinghe.consul.watch.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ConsulDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ConsulDemoApplication.class, args);
	}

}
