// Models
import DishModel from "../../Models/Dish/DishModel.js";

class DishHelper {

	async existDish ( dish_id ) {
		const findDish = await DishModel.findOne({ _id: dish_id, deleted_at: null });

		if ( findDish === null )
			return false;
        
		return findDish;
	}
}

export default new DishHelper;