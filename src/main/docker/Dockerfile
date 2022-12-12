FROM oracle/jdk:17
WORKDIR /app
COPY 'target/forum-1.0-SNAPSHOT.jar'  /app
COPY 'target/classes'  /app
ENTRYPOINT ["java", "-jar", "forum-1.0-SNAPSHOT.jar","-Dspring.profiles.active=docker"]