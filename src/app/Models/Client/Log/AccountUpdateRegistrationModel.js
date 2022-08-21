// Dependencies
import mongoose from "mongoose";

const LogUpdateModel = mongoose.model( "LogUpdate", {

	email: { type: String },
	new_name: { type: String },
	old_name: { type: String },
	new_email: { type: String },
	old_email: { type: String },
	update_password: { type: Date },
	updated_at: { type: Date }
    
});

export default LogUpdateModel;