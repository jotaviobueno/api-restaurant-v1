// Dependencies
import mongoose from "mongoose";

const DeletionHistoryModel = mongoose.model( "deleteDish", {

	deleted_by: { type: String, required: true },
	dish_id: { type: String, required: true },
	deleted_at: { type: Date, required: true  }
    
});

export default DeletionHistoryModel;