// Repository
import repository from "../../Repository/Client/UpdateRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";

class UpdateController {

	async UpdateName ( req, res ) {
		const { session_token } = req.headers;
		const { new_name, password } = req.body;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error:  "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error:  "your email is invalid" });

		if ( ClientInfo.name === new_name )
			return await ResponseHelper.badRequest( res, { error:  "name is the same as the account" });

		if (! await ClientHelper.comparePassword( password, ClientInfo.password ) )
			return await ResponseHelper.notAuthorized( res, { error:  "not authorized" });
		
		const UpdateInfo = await repository.updateNameAndCreateLog( ClientInfo.name, new_name, ClientInfo.email );

		if ( UpdateInfo )
			return await ResponseHelper.success( res, { 
				success:  "name changed", 
				email: ClientInfo.email, 
				new_name: UpdateInfo.new_name,
				old_name: UpdateInfo.old_name,
				updated_at: UpdateInfo.updated_at
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

}

export default new UpdateController;