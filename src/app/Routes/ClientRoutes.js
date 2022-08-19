// Dependencies
import express from "express";

// Route Profix
export const ClientRoutes = express.Router();

// Controller
import ClientController from "../Http/Controller/Client/ClientController.js";
import UpdateController from "../Http/Controller/Client/UpdateController.js";

// Request/ Validators/ Middlawares
import ClientRequest from "../Http/Request/Client/ClientRequest.js";
import UpdateRequest from "../http/Request/Client/UpdateRequest.js";

ClientRoutes.post( "/register", ClientRequest.ValidateStorage, ClientController.Storage );
ClientRoutes.post( "/login-email", ClientRequest.ValidateLoginEmail, ClientController.LoginEmail );
ClientRoutes.post( "/login-cpf", ClientRequest.ValidateLoginCpf, ClientController.LoginCpf );
ClientRoutes.get( "/my-account", ClientRequest.ValidateSeeAccount, ClientController.SeeAccount );
ClientRoutes.delete( "/my-account/delete", ClientRequest.ValidateDelete, ClientController.Delete );
ClientRoutes.patch( "/my-account/update-name", UpdateRequest.ValidateUpdateName, UpdateController.UpdateName );