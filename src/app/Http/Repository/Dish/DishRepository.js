// Models
import DishModel from "../../../Models/Dish/DishModel.js";
import DeletionHistoryModel from "../../../models/Dish/log/DeletionHistoryModel.js";

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

	async DeleteDishAndCreateLog (_id, email ) {
		await DishModel.findOneAndUpdate({ _id: _id, deleted_at: null }, { deleted_at: new Date(), updated_at: new Date() });

		return await DeletionHistoryModel.create({
			deleted_by: email,
			dish_id: _id,
			deleted_at: new Date()
		});
	}
}

export default new repository;