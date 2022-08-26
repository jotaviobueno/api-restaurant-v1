// Models
import DeliveryModel from "../../../Models/Delivery/AddressModel.js";
import AddressChangeHistoryModel from "../../../Models/Delivery/Log/AddressChangeHistoryModel.js";

class repository {

	async UpdateAddressAndCreateLog ( name, email, id, NewAddress, OldAddress ) {
		await DeliveryModel.findOneAndUpdate({ id: id, email: email, deleted_at: null }, { address: NewAddress, updated_at: new Date() });

		return await AddressChangeHistoryModel.create({
			name: name,
			email: email,
			id: id,
			OldAddress: OldAddress,
			NewAddress: NewAddress,
			updated_at: new Date()
		});
	}
}

export default new repository;