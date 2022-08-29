// repository
import repository from "../../Repository/Delivery/DeliveryRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import DeliveryHelper from "../../../Helper/Delivery/DeliveryHelper.js";
import CardHelper from "../../../Helper/Delivery/CardHelper.js";
import DishHelper from "../../../Helper/Dish/DishHelper.js";

class DeliveryController {

	async CreateOrder ( req, res ) {
		const { session_token, card_id } = req.headers;
		const { address_id  } = req.params;
		const { cvv, dish_id } = req.body;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		const CardInformation = await CardHelper.existCardId( card_id );

		if (! CardInformation )
			return await ResponseHelper.unprocessableEntity( res, { error: "card id is invalid" });

		if ( CardInformation.cvv != cvv )
			return await ResponseHelper.notAuthorized( res, { error: "not authorized" });

		const AddressInformation = await DeliveryHelper.existAddressId( address_id );

		if (! AddressInformation )
			return await ResponseHelper.unprocessableEntity( res, { error: "AddressInformation is invalid" });
    
		const DishInformation = await DishHelper.existDish( dish_id );

		if (! DishInformation )
			return await ResponseHelper.unprocessableEntity( res, { error: "dish_id is invalid" });

		const OrderInformation = await repository.CreateOrder( ClientInfo.name, ClientInfo.email, CardInformation.card, CardInformation.cvv_fake, CardInformation.expires_date,
			AddressInformation.address, DishInformation.dish_name, DishInformation.dish_body );

		if ( OrderInformation )
			return await ResponseHelper.success( res, OrderInformation );

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}
	
	async orderHistory ( req, res ) {
		const { session_token } = req.headers;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		const OrderHistory = await repository.findAllOrders( ClientInfo.email );

		if ( OrderHistory )
			return await ResponseHelper.success( res, OrderHistory );
	}

}

export default new DeliveryController;