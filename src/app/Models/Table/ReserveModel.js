// Dependencies
import mongoose from "mongoose";

const ReserveModel = mongoose.model( "reserve", {

	email: { type: String, required: true },
	name: { type: String, required: true },
	cpf: { type: Number, required: true },
	reserved_in: { type: Date, required: true },
	expires_in: { type: Date, required: true },
	table_id: { type: String, required: true },
    
});

export default ReserveModel;