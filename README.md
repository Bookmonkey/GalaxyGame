# GalaxyGame - Readme
### Setup
**Assumptions:** you have NodeJS, and PostgreSQL installed
1. Create database and tables using `docs/sql`
2. Fill out config file with your details and remove `tmpl` from `config.tmpl.js`
3. install node modules using either NPM or YARN

### Commands

1. Server `npm run dev:server` for production `npm run prod:server`
2. Client `npm run client`
3. Test `npm run test`


### Documentation
- [Planning Document](https://docs.google.com/document/d/1-G4UmwPdRxnubN2P6qAVIo_qADw2GpFwggUfvAKHQAw/edit)
- [Trello](https://trello.com/b/7eyBCtvZ/galaxy-game)

### Server structure
The entry point to the server is `server/server.js`. 

You can think of the server as having three core layers. The API, Controller and Data. In this exact order. The API consists of all routes the client can communicate with. EG: 'planet/upgrade'. 
- `API route` will interact and call controllers with minimal logic. Or in some cases it may directly call the Data Layer without the need of a controller.
- `Controller` is where any and all logic or data transformation is handled. Controllers can call each other. IE The PlanetController can call to the FleetController. 
- `Data`: read/write to the database. Absolutely no logic is to be done here. The idea here is once it reachs the data layer, the input has been transformed.


### Uses
**Server**
- NodeJS (v10.x)
- Postgres (latest)

**Client**
- VueJS (latest)
- ThreeJS