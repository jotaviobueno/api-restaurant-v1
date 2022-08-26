// Dependencies
import express from "express";

// Route Profix
export const DeliveryRoutes = express.Router();

// Controller
import UpdateController from "../Http/Controller/Delivery/UpdateController.js";

DeliveryRoutes.post( "/add/andress", UpdateController.AddAnddress );