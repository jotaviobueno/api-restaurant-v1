// Dependencies
import express from "express";

// Route Profix
export const DeliveryRoutes = express.Router();

// Controller
import DeliveryController from "../Http/Controller/Delivery/DeliveryController.js";
import UpdateController from "../http/Controller/Delivery/UpdateController.js";
import AddressController from "../http/Controller/Delivery/AddressController.js";
import CardController from "../http/Controller/Delivery/CardController.js";

// Request/ Validators/ Middlawares
import DeliveryRequest from "../http/Request/Delivery/DeliveryRequest.js";
import UpdateRequest from "../http/Request/Delivery/UpdateRequest.js";

DeliveryRoutes.post( "/create/request/c_id/:card_id/a_id/:address_id", DeliveryController.CreateRequest );

DeliveryRoutes.post( "/add/address", DeliveryRequest.ValidateAddAnddress, AddressController.AddAddress );
DeliveryRoutes.get( "/my-address", DeliveryRequest.ValidateFindAllAddress, AddressController.FindAllAddress );
DeliveryRoutes.delete( "/address/delete", DeliveryRequest.ValidateDelete, AddressController.DeleteAddress );
DeliveryRoutes.patch( "/address/update", UpdateRequest.ValidateUpdateAddress, UpdateController.UpdateAddress );

DeliveryRoutes.post( "/my-account/add/card", CardController.AddCard );
DeliveryRoutes.get( "/my-account/see-all/card", CardController.FindAllCard );
DeliveryRoutes.delete( "/my-account/card/delete", CardController.DeleteCard );

