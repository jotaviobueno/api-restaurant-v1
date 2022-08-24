import express from "express";

// Route Profix
export const DishRoutes = express.Router();

// Controller
import DishController from "../Http/Controller/Dish/DishController.js";

// Request/ Validators/ Middlawares

DishRoutes.post( "/create/dish", DishController.StorageDish );
DishRoutes.get( "/dishs", DishController.FindAllDish );