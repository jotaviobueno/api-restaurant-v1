// Dependencies
import mongoose from "mongoose";

const CardModel = mongoose.model( "Card", {

	name: { type: String, required: true },
	email: { type: String, required: true },
	id: { type: String, required: true },
	card: { type: String, required: true },
	expires_date: { type: String, required: true },
	cvv_fake: { type: String, required: true },
	cvv: { type: String, required: true },
	created_at: { type: Date, required: true },
	updated_at: { type: Date, required: true },
	deleted_at: { type: Date },

});

export default CardModel;