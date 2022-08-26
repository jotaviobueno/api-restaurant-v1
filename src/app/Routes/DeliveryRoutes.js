// Dependencies
import express from "express";

// Route Profix
export const DeliveryRoutes = express.Router();

// Controller
import UpdateController from "../Http/Controller/Delivery/DeliveryController.js";

// Request/ Validators/ Middlawares
import DeliveryRequest from "../http/Request/Delivery/DeliveryRequest.js";

DeliveryRoutes.post( "/add/andress", DeliveryRequest.ValidateAddAnddress, UpdateController.AddAnddress );
DeliveryRoutes.post( "/my-andress", DeliveryRequest.ValidateFindAllAddress, UpdateController.FindAllAddress );