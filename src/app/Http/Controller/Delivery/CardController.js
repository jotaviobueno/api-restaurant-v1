// repository
import repository from "../../Repository/Delivery/CardRepository.js";

// Helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import CardHelper from "../../../Helper/Delivery/CardHelper.js";


class CardController {
    
	async AddCard ( req, res ) {
		const { session_token } = req.headers;
		const { name, card_number, cvv, expires_date } = req.body;

		const Split = card_number.split("-");
		const Hidden = `****-****-****-${Split[3]}`;
		
		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		if (! await CardHelper.ExistCard( Hidden ) )
			return await ResponseHelper.unprocessableEntity( res, { error: "card already registered in the account" });
	
		if (! await CardHelper.varifyAmountOfCards( ClientInfo.email ) )
			return await ResponseHelper.unprocessableEntity( res, { error: "maximum number of cards added to account" });

		const CardStorageInformation = await repository.AddCard( name, ClientInfo.email, Hidden, cvv, expires_date );

		if ( CardStorageInformation )
			return await ResponseHelper.success( res, {
				name: CardStorageInformation.name,
				email: CardStorageInformation.email,
				id: CardStorageInformation.id,
				card: CardStorageInformation.card,
				expires_date: CardStorageInformation.expires_date,
				cvv: CardStorageInformation.cvv_fake
			});

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async FindAllCard ( req, res ) {
		const { session_token } = req.headers;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		const Informations = await repository.FindAll( ClientInfo.email );

		if ( Informations )
			return  ResponseHelper.success( res, Informations );

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async DeleteCard ( req, res ) {
		const { session_token, card_id } = req.headers;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		const CardInformation = await CardHelper.existCardId( card_id );

		if (! CardInformation )
			return await ResponseHelper.unprocessableEntity( res, { error: "card id is invalid" });

		const InformationDeleted = await repository.deleteCard( card_id );

		if ( InformationDeleted )
			return await ResponseHelper.success( res, {
				InformationDeleted: {InformationDeleted}
			});
			
		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}
}

export default new CardController;