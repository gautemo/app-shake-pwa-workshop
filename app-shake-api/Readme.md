# app-shake-api

This is a ktor application, 
with the only purpose of being a backend server for 
the PWA App Shake. It will contain the leaderboard and 
be able to send notifications.

## Set up
Environment variables `PUBLIC_KEY` and `PRIVATE_KEY` are needed. 
They were created with `npx web-push generate-vapid-keys`. Create file `secrets.list` and add content:
```
PUBLIC_KEY=
PRIVATE_KEY=
```

Google cloud:
```
gcloud run services update cloudservice --set-env-vars "PUBLIC_KEY=" --set-env-vars "PRIVATE_KEY="
```

Make sure min and max instances:  
During workshop:  
`gcloud run services update cloudservice --min-instances 1 --max-instances 1`  
After workshop:  
`gcloud run services update cloudservice --min-instances 0 --max-instances 1`  

## Run locally

IntelliJ:
Run `Application.kt` but set environment variables first.

Docker:  
`./gradlew installDist`  
`docker build -t app-shake-api .`  
`docker run -p 8080:8080 --env-file ./secrets.list app-shake-api`  

## Deploy
The application is build into a docker container and hosted on cloud run in Google cloud.

1. `./gradlew installDist`
2. `docker build -t app-shake-api . --tag gcr.io/app-shake-api/app-shake-pwa-workshop/cloudservice:latest --platform linux/amd64`
3. `docker push gcr.io/app-shake-api/app-shake-pwa-workshop/cloudservice:latest`
4. `gcloud run deploy cloudservice --image gcr.io/app-shake-api/app-shake-pwa-workshop/cloudservice:latest --port 8080`
