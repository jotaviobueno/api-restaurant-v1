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
import DeliveryRequest from "../Http/Request/Delivery/DeliveryRequest.js";
import UpdateRequest from "../http/Request/Delivery/UpdateRequest.js";
import AddressRequest from "../http/Request/Delivery/AddressRequest.js";

DeliveryRoutes.post( "/create/request/a_id/:address_id", DeliveryRequest.ValidateCreateOrder, DeliveryController.CreateOrder );
DeliveryRoutes.get( "/my-account/order/history", DeliveryRequest.ValidateSeeOrderHistory, DeliveryController.orderHistory );

DeliveryRoutes.post( "/add/address", AddressRequest.ValidateAddAnddress, AddressController.AddAddress );
DeliveryRoutes.get( "/my-address", AddressRequest.ValidateFindAllAddress, AddressController.FindAllAddress );
DeliveryRoutes.delete( "/address/delete", AddressRequest.ValidateDelete, AddressController.DeleteAddress );
DeliveryRoutes.patch( "/address/update", UpdateRequest.ValidateUpdateAddress, UpdateController.UpdateAddress );

DeliveryRoutes.post( "/my-account/add/card", CardController.AddCard );
DeliveryRoutes.get( "/my-account/see-all/card", CardController.FindAllCard );
DeliveryRoutes.delete( "/my-account/card/delete", CardController.DeleteCard );

