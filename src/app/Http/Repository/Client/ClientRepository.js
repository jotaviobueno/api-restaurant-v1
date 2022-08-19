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

	async existEmail ( email ) {
		const findEmail = await ClientModel.findOne({ email: email, deleted_at: null })
			.select({ password: 0, _id: 0, __v: 0, created_at: 0, updated_at: 0, deleted_at: 0, role: 0});

		if ( findEmail === null )
			return false;
        
		return findEmail;
	}
}

export default new repository;