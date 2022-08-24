// Dependencies
import express from "express";

// Route Profix
export const TableRoutes = express.Router();

// Controller
import TableController from "../http/Controller/Table/TableController.js";

// Request/ Validators/ Middlawares
import TableRequst from "../http/Request/Table/TableRequest.js";

TableRoutes.post( "/create/table", TableRequst.ValidateCreateTable, TableController.CreateTable );
TableRoutes.delete( "/table/delete/:table_id", TableRequst.ValidateDeleteTable, TableController.deleteTable );
TableRoutes.get( "/tables", TableRequst.ValidateFindAll, TableController.FindAll );

TableRoutes.post( "/create-reserve/:table_id", TableRequst.ValidateFindAll, TableController.Reserve );