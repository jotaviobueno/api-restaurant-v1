// Dependencies
import mongoose from "mongoose";

const OrderModel = mongoose.model( "Order", {

	dish_id: [ { 
		dish_name: String,
		dish_body: String, } 
	],
	cardInfo: {
		card: String,
		cvv: String,
		date: String
	},
	address: String,
	name: { type: String, required: true },
	email: { type: String, required: true },
	created_at: { type: Date, required: true },
	deleted_at: { type: Date },
	updated_at: { type: Date, required: true }
});

export default OrderModel;