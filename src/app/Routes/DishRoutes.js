import express from "express";

// Route Profix
export const DishRoutes = express.Router();

// Controller
import DishController from "../Http/Controller/Dish/DishController.js";
import UpdateController from "../Http/Controller/Dish/UpdateController.js";

// Request/ Validators/ Middlawares
import DishRequest from "../Http/Request/Dish/DishRequest.js";
import UpdateRequest from "../http/Request/Dish/UpdateRequest.js";

DishRoutes.post( "/create/dish", DishRequest.ValidateStorageDish, DishController.StorageDish );
DishRoutes.get( "/dishs", DishController.FindAllDish );
DishRoutes.delete( "/dish/delete", DishRequest.ValidateDeleteDish, DishController.Delete );
DishRoutes.patch( "/dish/update-name", UpdateRequest.ValidateUpdateDishName, UpdateController.UpdateDishName);
DishRoutes.patch( "/dish/update-body", UpdateRequest.ValidateUpdateDishBody, UpdateController.UpdateDishBody);