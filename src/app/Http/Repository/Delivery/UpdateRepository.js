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
			addressInfo: {
				address: address,
				id: nanoid(),
				created_at: new Date()
			},
		});
	}
}

export default new repository;