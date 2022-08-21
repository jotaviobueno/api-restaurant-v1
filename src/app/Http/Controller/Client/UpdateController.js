// Repository
import repository from "../../Repository/Client/UpdateRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import AuthHelper from "../../../Helper/Client/AuthHelper.js";

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
		
		const UpdateInfo = await repository.UpdateNameAndCreateLog( ClientInfo.name, new_name, ClientInfo.email );

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

	async UpdateEmail ( req, res ) {
		const { change_token } = req.params;
		const { new_email } = req.body;

		await AuthHelper.verifyTokenExpiresDate( );

		const TokenInfo = await AuthHelper.thisEmailChangeTokenExists( change_token );

		const ClientInfo = await ClientHelper.existEmail( TokenInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error:  "your email is invalid" });

		if ( new_email === ClientInfo.email )
			return await ResponseHelper.badRequest( res, { error:  "email is the same as the account" });

		const UpdateInfo = await repository.UpdateEmailAndCreateLog( ClientInfo.email, new_email );

		if ( UpdateInfo ) {

			await LoginHelper.disconnectAllSessions( ClientInfo.email );

			await AuthHelper.deleteToken( change_token );

			return await ResponseHelper.success( res, { 
				success:  "email changed, all sessions disconnected", 
				old_email: UpdateInfo.new_email, 
				new_email: UpdateInfo.old_email,
				updated_at: UpdateInfo.updated_at
			});

		}

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async UpdatePasswordWithoutToken ( req, res ) {
		const { session_token } = req.headers;
		const { password, new_password } = req.body;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error:  "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error:  "your email is invalid" });

		if (! await ClientHelper.comparePassword( password, ClientInfo.password ) )
			return await ResponseHelper.notAuthorized( res, { error:  "not authorized" });

		if ( await ClientHelper.comparePassword( new_password, ClientInfo.password ))
			return await ResponseHelper.unprocessableEntity( res, { error:  "your password is the same as the account" });

		const UpdateInfo = await repository.UpdatePasswordAndCreateLog( ClientInfo.email, new_password );

		if ( UpdateInfo ) {

			await LoginHelper.disconnectAllSessions( ClientInfo.email );

			return await ResponseHelper.success( res, { 
				success:  "password changed, all sessions disconnected", 
				update_password: UpdateInfo.update_password
			});

		}

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

}

export default new UpdateController;