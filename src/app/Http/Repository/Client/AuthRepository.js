// Models
import TokenChangeEmailModel from "../../../Models/Client/Log/AuthTokens/TokenChangeEmailModel.js";
import TokenChangePasswordModel from "../../../Models/Client/Log/AuthTokens/TokenChangePasswordModel.js";

// Dependencies
import { nanoid } from "nanoid";

class repository {

	async CreateTokenToChangeEmail ( email ) {
		return await TokenChangeEmailModel.create({ 
			email: email,
			token: nanoid(),
			token_expires_in: new Date().setHours(new Date().getHours() + 1),
			status: null

		});
	}

	async CreateTokenToChangePassword ( email ) {
		return await TokenChangePasswordModel.create({
			email: email,
			token: nanoid(),
			token_expires_in: new Date().setHours(new Date().getHours() + 1),
			status: null
		});
	}
}

export default new repository;