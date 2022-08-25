import express from "express";

// Route Profix
export const DishRoutes = express.Router();

// Controller
import DishController from "../Http/Controller/Dish/DishController.js";

// Request/ Validators/ Middlawares
import DishRequest from "../Http/Request/Dish/DishRequest.js";

DishRoutes.post( "/create/dish", DishRequest.ValidateStorageDish, DishController.StorageDish );
DishRoutes.get( "/dishs", DishController.FindAllDish );
DishRoutes.delete( "/dish/delete", DishRequest.ValidateDeleteDish, DishController.Delete );