// Models
import CardModel  from "../../Models/Delivery/CardModel.js";

// Settings
import {TotalCard} from "../../../config/Settings.js";

class CardHelper {

	async ExistCard ( cardHidden ) {
		if ( await CardModel.findOne({ card: cardHidden, deleted_at: null }) )
			return false;
        
		return true;
	}

	async varifyAmountOfCards ( email ) {
		const find = await CardModel.find({ email: email });

		if ( find.length >= TotalCard )
			return false;

		return true;
	}

	async existCardId ( id ) {
		const findCard = await CardModel.findOne({ id: id, deleted_at: null });

		console.log(findCard);
	
		if ( findCard === null )
			return false;

		return findCard;
	}
}

export default new CardHelper;