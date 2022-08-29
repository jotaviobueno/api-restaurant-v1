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

	// async VerifyArray ( dish_id ) {
	// 	for (var i in dish_id) {
	// 		const findDish = await DishModel.findOne({ _id: dish_id[i], deleted_at: null });

	// 		if ( findDish === null )
	// 			return false;

	// 		return findDish;
	// 	} 
	// }

}

export default new DishHelper;