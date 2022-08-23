// Dependencies
import express from "express";

// Route Profix
export const ArticleRoutes = express.Router();

// Controller
import TableController from "../http/Controller/Table/TableController.js";

// Request/ Validators/ Middlawares

ArticleRoutes.post( "/create-article", TableController.CreateTable );