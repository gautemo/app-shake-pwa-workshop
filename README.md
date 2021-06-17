# app-shake-pwa-workshop

App shake, how fast can you shake your phone? Used for a workshop on how to create a Progressive Web App.

# Workshop

[Exercise 1 - Make app installable](Exercise-1.md)  
[Exercise 2 - Cache files & offline mode](Exercise-2.md)  
[Exercise 3 - Promoting PWA installation](Exercise-3.md)  
[Exercise 4 - Capable](Exercise-4.md)  

# About

Website hosted on [app-shake.netlify.app](https://app-shake.netlify.app/).  

## Frontend

The frontend is a React TypeScript project created with [Vite](https://vitejs.dev/) for the fastest dev experience!

Commands to run from the terminal:
```
npm run dev // run on localhost
npm run netlify:init // one time setup project with [Netlify](https://www.netlify.com/)
npm run netlify:deploy // to deploy to Netlify
```

## Backend

Folder [app-shake-api](app-shake-api) is used for backend and are not needed for the workshop. 
But feel free to look at it. It's responsible for the leaderboard and sending push notifications. 
It is written in Kotlin with the framework Ktor. 
It is then wrapped in a docker container and hosted on Cloud Run on Google Cloud.

See [README](app-shake-api/README.md) for more information.