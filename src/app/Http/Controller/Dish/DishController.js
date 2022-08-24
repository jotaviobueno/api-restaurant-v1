// repository
import repository from "../../Repository/dish/DishRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";

// Settings
import { RoleNumber } from "../../../../config/Settings.js";

class DishController {

	async StorageDish ( req, res ) {
		const { session_token } = req.headers;
		const { dish_name, dish_body } = req.body;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		if ( ClientInfo.role != RoleNumber )
			return await ResponseHelper.notAuthorized( res, { error: "not authorized" });

		const DishInfo = await repository.StorageDish( dish_name, dish_body, ClientInfo.email );

		if ( DishInfo )
			return await ResponseHelper.created( res, { 
				success: "Dish Created",
				_id: DishInfo._id,
				created_by: DishInfo.created_by,
				dish_name: DishInfo.dish_name,
				dish_body: DishInfo.dish_body,
				created_at: DishInfo.created_at,
            
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async FindAllDish ( req, res ) {
		
		const FindInfo = await repository.FindAll();

		if ( FindInfo )
			return await ResponseHelper.created( res, { 
				success: "All Dishs",
				all_dish: FindInfo
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}
}

export default new DishController;