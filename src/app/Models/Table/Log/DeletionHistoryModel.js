// Dependencies
import mongoose from "mongoose";

const DeletionHistoryModel = mongoose.model( "DeletionHistory", {
	table_id: { type: String, required: true },
	deleted_by: { type: String, required: true },
	deleted_at: { type: Date, required: true }

});

export default DeletionHistoryModel;