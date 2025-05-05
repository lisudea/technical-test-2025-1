package com.proyectolis.registro_actividades_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Aplica esta configuración a todas las rutas bajo /api/
                        .allowedOrigins("http://localhost:3000", "http://localhost:5173") // Especifica los orígenes permitidos
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Especifica los métodos permitidos
                        .allowedHeaders("*") // Permite todos los encabezados
                        .allowCredentials(true) // Si necesitas manejar cookies o autenticación basada en encabezados
                        .maxAge(3600); // Tiempo en segundos que el navegador puede cachear la respuesta CORS (opcional)
            }
        };
    }
}
