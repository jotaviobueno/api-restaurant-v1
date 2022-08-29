// Dependencies
import mongoose from "mongoose";

const RequestModel = mongoose.model( "Request", {

	dish_id: { type: [String], required: true },
	name: { type: String, required: true },
	email: { type: String, required: true },
	created_at: { type: Date, required: true },
	deleted_at: { type: Date },
	updated_at: { type: Date, required: true }

});

export default RequestModel;