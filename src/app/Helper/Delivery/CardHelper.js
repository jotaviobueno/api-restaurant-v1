// Models
import CardModel  from "../../Models/Delivery/CardModel.js";

class CardHelper {

	async ExistCard ( cardHidden ) {
		if ( await CardModel.findOne({ card: cardHidden, deleted_at: null }) )
			return false;
        
		return true;
	}
}

export default new CardHelper;