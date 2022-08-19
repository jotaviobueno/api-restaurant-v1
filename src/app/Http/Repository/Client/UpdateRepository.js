// Models
import ClientModel from "../../../Models/Client/ClientModel.js";
import AccountUpdateRegistrationModel from "../../../Models/Client/Log/AccountUpdateRegistrationModel.js";

class repository {

	async updateNameAndCreateLog ( name, new_name, email ) {
		await ClientModel.findOneAndUpdate({ email: email, deleted_at: null }, { name: new_name, update_at: new Date() });
			
		return await AccountUpdateRegistrationModel.create({

			email: email,
			new_name: new_name,
			old_name: name,
			updated_at: new Date()
				
		});
	}

}

export default new repository;