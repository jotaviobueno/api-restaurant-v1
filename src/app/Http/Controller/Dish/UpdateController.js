// repository
import repository from "../../Repository/Dish/UpdateRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import DishHelper from "../../../Helper/Dish/DishHelper.js";

// Settings
import { RoleNumber } from "../../../../config/Settings.js";

class UpdateController {

	async UpdateDishName ( req, res ) {
		const { session_token, dish_id } = req.headers;
		const { new_dish_name } = req.body;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		const DishInfo = await DishHelper.existDish( dish_id );

		if (! DishInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "dish_id is invalid" });

		if ( ClientInfo.role != RoleNumber )
			return await ResponseHelper.notAuthorized( res, { error: "not authorized" });

		if ( DishInfo.dish_name === new_dish_name )
			return await ResponseHelper.unprocessableEntity( res, { error: "dish_id is invalid" });

		const UpdatedInformations = await repository.UpdateDishNameAndCreateLog( new_dish_name, DishInfo._id, ClientInfo.email, DishInfo.dish_name );

		if ( UpdatedInformations )
			return await ResponseHelper.success( res, { 
				updated_by: UpdatedInformations.email,
				dish_id: UpdatedInformations.dish_id,
				old_dish_name: UpdatedInformations.old_dish_name,
				new_dish_name: UpdatedInformations.new_dish_name,
				updated_at: UpdatedInformations.updated_at
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });

	}

	async UpdateDishBody ( req, res ) {
		const { session_token, dish_id } = req.headers;
		const { new_dish_body } = req.body;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		const DishInfo = await DishHelper.existDish( dish_id );

		if (! DishInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "dish_id is invalid" });

		if ( ClientInfo.role != RoleNumber )
			return await ResponseHelper.notAuthorized( res, { error: "not authorized" });

		if ( DishInfo.dish_body === new_dish_body )
			return await ResponseHelper.unprocessableEntity( res, { error: "dish_id is invalid" });
	
		const UpdatedInformations = await repository.UpdateDishBodyandCreateLog( new_dish_body, DishInfo._id, ClientInfo.email, DishInfo.dish_body );
	
		if ( UpdatedInformations )
			return await ResponseHelper.success( res, { 
				updated_by: UpdatedInformations.email,
				dish_id: UpdatedInformations.dish_id,
				old_dish_body: UpdatedInformations.old_dish_body,
				new_dish_body: UpdatedInformations.new_dish_body,
				updated_at: UpdatedInformations.updated_at
			});
	
		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}
}

export default new UpdateController;