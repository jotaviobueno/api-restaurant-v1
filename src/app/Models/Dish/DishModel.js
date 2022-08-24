// Dependencies
import mongoose from "mongoose";

const DishModel = mongoose.model( "dish", {

	created_by: { type: String, required: true },
	dish_name: { type: String, required: true },
	dish_body: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date }
    
});

export default DishModel;