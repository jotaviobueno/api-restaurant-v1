// Dependencies
import mongoose from "mongoose";

const TableModel = mongoose.model( "Table", {

	created_by: { type: String, required: true },
	booked_by: {
		email: { type: String },
		name: { type: String },
		cpf: { type: Number },
	},
	reserved: { type: Boolean, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date }
    
});

export default TableModel;