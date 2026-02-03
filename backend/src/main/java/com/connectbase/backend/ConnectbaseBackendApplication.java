package com.connectbase.backend;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class ConnectbaseBackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(ConnectbaseBackendApplication.class, args);
		log.info("🚀 ConnectBase Backend has started successfully with Gradle!");
		log.debug("🐛 Debug mode is active for com.connectbase.backend");
	}

}
