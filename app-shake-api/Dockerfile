FROM openjdk:11-jdk
EXPOSE 8080:8080
RUN mkdir /app
CMD ["./gradlew installDist"]
COPY ./build/install/app-shake-api/ /app/
WORKDIR /app/bin
CMD ["./app-shake-api"]