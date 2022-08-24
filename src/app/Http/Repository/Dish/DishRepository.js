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

	async FindAll ( ) {
		return await DishModel.find({ deleted_at: null }).select({ __v: 0, created_at: 0, update_at: 0, deleted_at: 0 });
	}
}

export default new repository;