// Dependencies
import mongoose from "mongoose";

const TableModel = mongoose.model( "Table", {

	table_created_by: { type: String, required: true },
	booked_by: {
		email: { type: String, required: true },
		name: { type: String, required: true },
		cpf: { type: Number, required: true },
	},
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date }
    
});

export default TableModel;