// Dependencies
import express from "express";

// Route Profix
export const ClientRoutes = express.Router();

// Controller
import ClientController from "../Http/Controller/Client/ClientController.js";

// Request/ Validators/ Middlawares
import ClientRequest from "../Http/Request/Client/ClientRequest.js";

ClientRoutes.post( "/register", ClientRequest.ValidateStorage, ClientController.Storage );
ClientRoutes.post( "/login-email", ClientRequest.ValidateLoginEmail, ClientController.LoginEmail );
ClientRoutes.post( "/login-cpf", ClientRequest.ValidateLoginCpf, ClientController.LoginCpf );
