// Dependencies
import express from "express";

// Route Profix
export const TableRoutes = express.Router();

// Controller
import TableController from "../http/Controller/Table/TableController.js";

// Request/ Validators/ Middlawares

TableRoutes.post( "/create-table", TableController.CreateTable );
TableRoutes.delete( "/table/delete/:table_id", TableController.deleteTable );