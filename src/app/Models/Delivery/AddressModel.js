// Dependencies
import mongoose from "mongoose";

const AddresModel = mongoose.model( "address", {

	name: { type: String, required: true },
	email: { type: String, required: true },
	id: { type: String },
	address: { type: String },
	created_at: { type: Date, required: true },
	deleted_at: { type: Date },
	updated_at: { type: Date, required: true }

    
});

export default AddresModel;