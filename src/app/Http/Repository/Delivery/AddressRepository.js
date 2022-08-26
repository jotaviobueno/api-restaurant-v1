// Models
import ClientModel from "../../../Models/Client/ClientModel.js";
import AddresModel from "../../../Models/Delivery/AddressModel.js";

import { nanoid } from "nanoid";

class repository {

	async AddAndress ( address, email, name ) {
		await ClientModel.findOneAndUpdate({ email: email, deleted_at: null }, { updated_at: new Date() });

		return await AddresModel.create({
			name: name,
			email: email,
			id: nanoid(),
			address: address,
			created_at: new Date(),
			deleted_at: null,
			updated_at: new Date()
		});
	}

	async FindAllAddress ( email ) {
		return await AddresModel.find({ email: email, deleted_at: null }).select({ __v: 0, _id: 0 });
	}

	async DeleteAddress ( id, email ) {
		return await AddresModel.findOneAndUpdate({ id: id, email: email, deleted_at: null }, { deleted_at: new Date(), updated_at: new Date() }).select({ __v: 0, _id: 0 });
	}
}

export default new repository;