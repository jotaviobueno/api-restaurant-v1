// repository
import repository from "../../Repository/Table/TableRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import TableHelper from "../../../Helper/Table/TableHelper.js";

// Settings
const RoleNumber = 10;

class TebleController {
    
	async CreateTable ( req, res ) {
		const { session_token } = req.headers;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		if ( ClientInfo.role != RoleNumber )
			return await ResponseHelper.notAuthorized( res, { error: "not authorized" });

		const TableInfo = await repository.CreateTable( ClientInfo.email );

		if ( TableInfo )
			return await ResponseHelper.success( res, { 
				length: await repository.AmountOfTables(),
				success: "Table Created",
				article_info: {
					table_id: TableInfo._id,
					crated_by: TableInfo.created_by,
					reserved: TableInfo.reserved,
					created_at: TableInfo.created_at,
					deleted_at: TableInfo.deleted_at
				}
                
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async  deleteTable ( req, res ) {
		const { session_token } = req.headers;
		const { table_id } = req.params;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error:  "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		const TableInfo = await TableHelper.existTable( table_id );

		if (! TableInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "table id is invalid" });

		const DeletetionInfo = await repository.deleteTableAndCreateLog( table_id, ClientInfo.email );

		if ( DeletetionInfo )
			return await ResponseHelper.success( res, { 
				success: "Table Deleted",
				table_id: DeletetionInfo._id,
				deleted_by: DeletetionInfo.deleted_by,
				deleted_at: DeletetionInfo.deleted_at
			
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async FindAll ( req, res ) {
		const { session_token } = req.headers;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error:  "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		const FindAllInfo = await repository.FindAllTables();

		if ( FindAllInfo )
			return await ResponseHelper.success( res, { total: FindAllInfo.length, total_table: FindAllInfo });
			
		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async Reserve ( req, res ) {
		const { session_token } = req.headers;
		const { table_id } = req.params;
		const { date } = req.body;
		const dateString = new Date( date );

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error:  "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		if ( await TableHelper.HaveReservation( ClientInfo.email ) != false )
			return await ResponseHelper.unprocessableEntity( res, { error: "you already have a reservation" });

		const TableInfo = await TableHelper.existTable( table_id );

		if (! TableInfo ) {
			await TableHelper.verifyDateExpires();

			return await ResponseHelper.unprocessableEntity( res, { error: "table id is invalid" });
		}

		if ( new Date() >= dateString )
			return await ResponseHelper.unprocessableEntity( res, { error: "date its > new Date" });
		
		const ReserveInfo =  await repository.CreateReserveAndDeactivationToken( ClientInfo.name, ClientInfo.email, ClientInfo.cpf, dateString, table_id );

		if ( ReserveInfo )
			return await ResponseHelper.success( res, { 
				success: "reserve created",
				email: ReserveInfo.email,
				name: ReserveInfo.name,
				reserved_in: ReserveInfo.date,
				expires_in: ReserveInfo.expires_in,
				table_id: ReserveInfo.table_id,
				reserve_id: ReserveInfo._id
		
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

}

export default new TebleController;