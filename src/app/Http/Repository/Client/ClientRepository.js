// Models
import ClientModel from "../../../Models/Client/ClientModel.js";

// dependencies
import bcrypt from "bcrpyt";

class repository {

	async Storage ( name, email, password, cpf ) {
		return await ClientModel.create({
			name: name,
			email: email,
			password: await bcrypt.hash( password, 10 ),
			cpf: cpf,
			role: 0,
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null 
		});
	}

}

export default new repository;