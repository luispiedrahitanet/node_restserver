require('dotenv').config();
const Server = require('./models/Server')   // Importando la clase Server

const server = new Server();

server.listen();
