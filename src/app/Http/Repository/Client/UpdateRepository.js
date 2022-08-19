// Models
import ClientModel from "../../../Models/Client/ClientModel.js";
import AccountUpdateRegistrationModel from "../../../Models/Client/Log/AccountUpdateRegistrationModel.js";

class repository {

	async UpdateNameAndCreateLog ( name, new_name, email ) {
		await ClientModel.findOneAndUpdate({ email: email, deleted_at: null }, { name: new_name, update_at: new Date() });
			
		return await AccountUpdateRegistrationModel.create({

			email: email,
			new_name: new_name,
			old_name: name,
			updated_at: new Date()
				
		});
	}

	async UpdateEmailAndCreateLog ( old_email, new_email ) {
		await ClientModel.findOneAndUpdate({ email: old_email, deleted_at: null }, { email: new_email, update_at: new Date() });

		return await AccountUpdateRegistrationModel.create({

			new_email: new_email,
			old_email: old_email,
			updated_at: new Date()
				
		});
	}

}

export default new repository;