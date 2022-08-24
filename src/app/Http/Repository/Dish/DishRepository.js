// Models
import DishModel from "../../../Models/Dish/DishModel.js";

class repository {

	async StorageDish ( dish_name, dish_body, email ) {
		return await DishModel.create({
			created_by: email,
			dish_name: dish_name,
			dish_body: dish_body,
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null
		});
	}
}

export default new repository;