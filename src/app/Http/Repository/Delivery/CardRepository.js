// Models
import CardModel from "../../../Models/Delivery/CardModel.js";

// dependencies
import { nanoid } from "nanoid";

class repository {

	async AddCard ( name, email, card, cvv, expires_date ) {
		return await CardModel.create({
			name: name,
			email: email,
			id: nanoid(),
			card: card,
			expires_date: expires_date,
			cvv_fake: "***",
			cvv: cvv,
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null,
		});
	}

	async FindAll ( email ) {
		return await CardModel.find({ email: email, deleted_at: null }).select({ _id: 0, __v: 0, updated_at: 0, deleted_at: 0, cvv: 0 });
	}

	async deleteCard ( id ) {
		return await CardModel.findOneAndDelete({ id: id, deleted_at: null }).select({ updated_at: 0, _id: 0, __v: 0, deleted_at:0, cvv: 0 });
	}

}

export default new repository;