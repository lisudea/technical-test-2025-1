FROM openjdk:17
EXPOSE 8080
ADD target/technical-test-2025-1.jar technical-test-2025-1.jar

ENTRYPOINT ["java", "-jar", "technical-test-2025-1.jar"]