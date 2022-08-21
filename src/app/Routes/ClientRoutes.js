// Dependencies
import express from "express";

// Route Profix
export const ClientRoutes = express.Router();

// Controller
import ClientController from "../Http/Controller/Client/ClientController.js";
import UpdateController from "../Http/Controller/Client/UpdateController.js";
import AuthController from "../http/controller/Client/AuthController.js";

// Request/ Validators/ Middlawares
import ClientRequest from "../Http/Request/Client/ClientRequest.js";
import UpdateRequest from "../http/Request/Client/UpdateRequest.js";
import AuthRequest from "../Http/Request/Client/AuthRequest.js";

ClientRoutes.post( "/register", ClientRequest.ValidateStorage, ClientController.Storage );
ClientRoutes.post( "/login-email", ClientRequest.ValidateLoginEmail, ClientController.LoginEmail );
ClientRoutes.post( "/login-cpf", ClientRequest.ValidateLoginCpf, ClientController.LoginCpf );
ClientRoutes.get( "/my-account", ClientRequest.ValidateSeeAccount, ClientController.SeeAccount );
ClientRoutes.delete( "/my-account/delete", ClientRequest.ValidateDelete, ClientController.Delete );
ClientRoutes.patch( "/my-account/update-name", UpdateRequest.ValidateUpdateName, UpdateController.UpdateName );
ClientRoutes.patch( "/my-account/update-password", UpdateRequest.ValidateUpdatePasswordWithoutToken, UpdateController.UpdatePasswordWithoutToken );

// Auth
ClientRoutes.get( "/my-account/get-token/change-email", AuthRequest.ValidateGetTokenChangeEmail, AuthController.generationTokenToChangeEmail );
ClientRoutes.patch( "/update-email/:change_token", UpdateRequest.ValidateUpdateEmail, UpdateController.UpdateEmail );