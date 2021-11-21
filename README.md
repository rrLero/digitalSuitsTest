# digitalSuitsTest

# Server (NestJs, localhost:3000, swagger: localhost:3000/api)
1. cd Server
2. npm i
3. npm run start:dev

Server can:
- upload CSV files 
- parsing and writing it to virtual DB
- checking for unique CSV
- send email on uploading new CSV (email can be changed in "emailToSend.ts" constant)

# Client (React, localhost:3003, RTK, MaterialUI, lints, configs, tailwind)
1. cd Client
2. npm i
3. npn run start-dev-server-local
4. Test CSV in root folder

Client uses code generation from ApiSwagger, also uses RTK for fetching data.
Logic and views very simple

#Use Docker to Start App
1. docker-compose build
2. docker-compose up
