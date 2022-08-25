// Models
import DishModel from "../../Models/Dish/DishModel.js";

class DishHelper {

	async existDish ( dish_id ) {
		try {
			const findDish = await DishModel.findOne({ _id: dish_id, deleted_at: null });

			console.log(findDish);

			if ( findDish === null )
				return false;
        
			return findDish;

		} catch (e) {
			return false;
		}
	}
}

export default new DishHelper;