// Dependencies
import mongoose from "mongoose";

const UpdateModel = mongoose.model( "UpdateDish", {

	updated_by: { type: String, required: true },
	dish_id: { type: String, required: true },
	old_dish_name: { type: String },
	new_dish_name: { type: String },
	old_dish_body: { type: String },
	new_dish_body: { type: String },
	updated_at: { type: Date, required: true }
    
});

export default UpdateModel;