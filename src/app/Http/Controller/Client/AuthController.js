// repository
import repository from "../../repository/Client/AuthRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthHelper from "../../../Helper/Client/AuthHelper.js";

class AuthController {

	async generationTokenToChangeEmail ( req, res ) {
		const { session_token } = req.headers;
		const { password } = req.body;

		await AuthHelper.verifyTokenExpiresDate( );

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error:  "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error:  "your email is invalid" });

		await AuthHelper.checkTheAmountOfUserToken( ClientInfo.email );

		if (! await ClientHelper.comparePassword( password, ClientInfo.password ) )
			return await ResponseHelper.notAuthorized( res, { error:  "not authorized" });

		const TokenInfo = await repository.CreateTokenToChangeEmail( ClientInfo.email );

		if ( TokenInfo )
			return await ResponseHelper.created( res, { 
				success:  "token created", 
				token_info: {
					change_token: TokenInfo.token,
					token_expires_in: TokenInfo.token_expires_in
				}
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

}

export default new AuthController;
