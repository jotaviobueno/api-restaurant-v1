// Dependencies
import mongoose from "mongoose";

const DeletionRecordModel = mongoose.model( "DeletionRecord", {
	email: { type: String },
	name: { type: String },
	cpf: { type: Number },
	role: { type: Number },
	deleted_at: { type: Date }
});

export default DeletionRecordModel;