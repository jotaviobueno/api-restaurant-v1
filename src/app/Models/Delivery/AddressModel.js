// Dependencies
import mongoose from "mongoose";

const AddresModel = mongoose.model( "address", {

	name: { type: String, required: true },
	email: { type: String, required: true },
	addressInfo: {
		address: String,
		id: String,
		created_at: { type: Date },
	},

    
});

export default AddresModel;