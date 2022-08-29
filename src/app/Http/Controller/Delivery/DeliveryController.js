// repository
import repository from "../../Repository/Delivery/DeliveryRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import DeliveryHelper from "../../../Helper/Delivery/DeliveryHelper.js";
import CardHelper from "../../../Helper/Delivery/CardHelper.js";

class DeliveryController {

	async CreateRequest ( req, res ) {
		const { session_token } = req.headers;
		const { address_id, card_id  } = req.params;
		const { cvv } = req.body;
	
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
    
        
		
	}

}

export default new DeliveryController;