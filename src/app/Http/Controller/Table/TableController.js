// repository
import repository from "../../Repository/Table/TableRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
// import AuthHelper from "../../../Helper/Client/AuthHelper.js";

// Settings
const RoleNumber = 10;

class TebleController {
    
	async CreateTable ( req, res ) {
		const { session_token } = req.headers;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error:  "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error:  "your email is invalid" });

		if ( ClientInfo.role != RoleNumber )
			return await ResponseHelper.notAuthorized( res, { error:  "not authorized" });

		const TableInfo = await repository.CreateTable( ClientInfo.email );

		if ( TableInfo )
			return await ResponseHelper.success( res, { 

				length: await repository.AmountOfTables(),
				success: "Table Created",
				article_info: {
					article_id: TableInfo._id,
					crated_by: TableInfo.created_by,
					reserved: TableInfo.reserved,
					created_at: TableInfo.created_at,
					deleted_at: TableInfo.deleted_at
				}
                
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}


}

export default new TebleController;