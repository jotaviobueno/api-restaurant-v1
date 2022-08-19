// Models
import TokenChangeEmailModel from "../../Models/Client/Log/AuthTokens/TokenChangeEmailModel.js";

class AuthHelper {
	async verifyTokenExpiresDate (  ) {
		const findAllTokens = await TokenChangeEmailModel.find({ status: null });

		findAllTokens.forEach( async ( tokens ) => {
			if ( new Date() >= tokens.token_expires_in )
				await TokenChangeEmailModel.findOneAndUpdate({ token: tokens.token }, {status: false });

		});

	}

	async checkTheAmountOfUserToken ( email ) {
		const findAllUserToken = await TokenChangeEmailModel.find({ email: email, status: null });

		if ( findAllUserToken.length >= 1 )
			await TokenChangeEmailModel.updateMany({ email: email }, { status: false });
            
	}
}

export default new AuthHelper;