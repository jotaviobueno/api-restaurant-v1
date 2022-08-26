// Dependencies
import mongoose from "mongoose";

const AddressChangeHistoryModel = mongoose.model( "AddressChangeHistory", {

	name: { type: String, required: true },
	email: { type: String, required: true },
	id: { type: String },
	OldAddress: { type: String },
	NewAddress: { type: String },
	updated_at: { type: Date, required: true }

});

export default AddressChangeHistoryModel;