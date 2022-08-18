// Repository
import repository from "../../Repository/Client.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
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
}

export default new ClientController;