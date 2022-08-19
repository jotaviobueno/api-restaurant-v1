// Models
import ClientModel from "../../../Models/Client/ClientModel.js";
import LogUpdateModel from "../../../Models/Client/Log/LogUpdateModel.js";

class repository {

	async updateNameAndCreateLog ( name, new_name, email ) {
		await ClientModel.findOneAndUpdate({ email: email, deleted_at: null }, { name: new_name, update_at: new Date() });
			
		return await LogUpdateModel.create({

			email: email,
			new_name: new_name,
			old_name: name,
			updated_at: new Date()
				
		});
	}

}

export default new repository;