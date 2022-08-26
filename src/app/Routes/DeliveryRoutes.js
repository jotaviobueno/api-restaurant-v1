// Dependencies
import express from "express";

// Route Profix
export const DeliveryRoutes = express.Router();

// Controller
import DeliveryController from "../Http/Controller/Delivery/DeliveryController.js";
import UpdateController from "../http/Controller/Delivery/UpdateController.js";

// Request/ Validators/ Middlawares
import DeliveryRequest from "../http/Request/Delivery/DeliveryRequest.js";
import UpdateRequest from "../http/Request/Delivery/UpdateRequest.js";

DeliveryRoutes.post( "/add/address", DeliveryRequest.ValidateAddAnddress, DeliveryController.AddAnddress );
DeliveryRoutes.get( "/my-address", DeliveryRequest.ValidateFindAllAddress, DeliveryController.FindAllAddress );
DeliveryRoutes.delete( "/address/delete", DeliveryRequest.ValidateDelete, DeliveryController.DeleteAddress );

DeliveryRoutes.patch( "/address/update", UpdateRequest.ValidateUpdateAddress, UpdateController.UpdateAddress );