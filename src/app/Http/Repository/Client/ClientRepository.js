// Models
import ClientModel from "../../../Models/Client/ClientModel.js";
import LoginModel from "../../../Models/Client/LoginModel.js";

// dependencies
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

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

	async CreateSession ( email ) {
		return await LoginModel.create({
			email: email,
			session_token: nanoid(),
			login_made_in: new Date(),
			disconnected_in: null
		});
	}

}

export default new repository;