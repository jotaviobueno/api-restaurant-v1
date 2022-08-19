// Repository
import repository from "../../Repository/Client/ClientRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";

class ClientController {

	async Storage ( req, res ) {
		const { name, email, password, cpf } = req.body;

		if ( await ClientHelper.existEmail( email ) )
			return await ResponseHelper.unprocessableEntity( res, { error:  "email already registered" });

	 	if ( await ClientHelper.existCpf( cpf ) )
		 	return await ResponseHelper.unprocessableEntity( res, { error:  "cpf already registered" });

		const clientInfo = await repository.Storage( name, email, password, cpf );

		if ( clientInfo )
			return await ResponseHelper.created( res, { 
				success:  "account created", 
				email: clientInfo.email, 
				name: clientInfo.name,  
				cpf: clientInfo.cpf
			
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });

	}

	async LoginEmail ( req, res ) {
		const { email, password } = req.body;

		await LoginHelper.checkAmountNumberOfLogins( email );

		const ClientInfo = await ClientHelper.existEmail( email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error:  "email not registered" });

		if (! await ClientHelper.comparePassword( password, ClientInfo.password ) )
			return await ResponseHelper.notAuthorized( res, { error:  "not authorized" });

		const sessionInfo = await repository.CreateSession( email );

		if ( sessionInfo )
			return await ResponseHelper.success( res, { 
				success:  "login made", 
				email: sessionInfo.email,
				name: ClientInfo.name,
				session_token: sessionInfo.session_token,
				login_made_in: sessionInfo.login_made_in
		
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async LoginCpf ( req, res ) {
		const { cpf, password } = req.body;

		const ClientInfo = await ClientHelper.existCpf( cpf );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error:  "cpf not registered" });

		await LoginHelper.checkAmountNumberOfLogins( ClientInfo.email );

		if (! await ClientHelper.comparePassword( password, ClientInfo.password ) )
			return await ResponseHelper.notAuthorized( res, { error:  "not authorized" });

		const sessionInfo = await repository.CreateSession( ClientInfo.email );

		if ( sessionInfo )
			return await ResponseHelper.success( res, { 
				success:  "login made", 
				email: sessionInfo.email, 
				name: ClientInfo.name,
				session_token: sessionInfo.session_token,
				login_made_in: sessionInfo.login_made_in
		
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async SeeAccount ( req, res ) {
		const { session_token } = req.headers;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error:  "your session is invalid" });

		const ClientInfo = await repository.existEmail( SessionInfo.email );

		if ( ClientInfo )
			return await ResponseHelper.success( res, { 
				success:  "account info", 
				account_info: ClientInfo
		
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async Delete ( req, res ) {
		const { session_token } = req.headers;
		const { password } = req.body;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error:  "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error:  "your email is invalid" });

		if (! await ClientHelper.comparePassword( password, ClientInfo.password ) )
			return await ResponseHelper.notAuthorized( res, { error:  "not authorized" });

		const deletetionInfo = await repository.deleteAccountAndCreateLog( ClientInfo );

		if ( deletetionInfo ) {
			await LoginHelper.disconnectAllSessions( ClientInfo.email );

			return await ResponseHelper.success( res, { 
				success:  "account info", 
				deletetion_info: {
					email_deleted: deletetionInfo.email,
					cpf_deleted: deletetionInfo.cpf,
					deleted_at: deletetionInfo.deleted_at
				}
			});
		}

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}
}

export default new ClientController;