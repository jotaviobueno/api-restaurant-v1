// Dependencies
import express from "express";
import dotenv from "dotenv";

// Port
const port = 8081;

// DataBase Connect
import {Connect} from "./config/MongooseConnect.js";

// Routes
import {ClientRoutes} from "./app/Routes/ClientRoutes.js";
import {TableRoutes} from "./app/Routes/TableRoutes.js";
import {DishRoutes} from "./app/Routes/DishRoutes.js";

// Config
const app = express();

dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", ClientRoutes);
app.use("/", TableRoutes);
app.use("/", DishRoutes);

if ( await Connect() ) {
	app.listen( port, () => {
		console.log( "listen on!" );
	});
}