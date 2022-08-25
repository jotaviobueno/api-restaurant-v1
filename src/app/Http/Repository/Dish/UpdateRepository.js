// Models
import DishModel from "../../../Models/Dish/DishModel.js";
import UpdateDishModel from "../../../Models/Dish/Log/UpdateDishModel.js";

class repository {

	async UpdateDishNameAndCreateLog ( NewDishName, _id, email, OldDishName ) {
		await DishModel.findOneAndUpdate({ _id: _id, deleted_at: null }, { dish_name: NewDishName, updated_at: new Date() });

		return await UpdateDishModel.create({
			updated_by: email,
			dish_id: _id,
			old_dish_name: OldDishName,
			new_dish_name: NewDishName,
			updated_at: new Date()
		});
	}

	async UpdateDishBodyandCreateLog ( newDishBody, _id, email, OldDishBody ) {
		await DishModel.findOneAndUpdate({ _id: _id, deleted_at: null }, { dish_body: newDishBody, updated_at: new Date() });

		return await UpdateDishModel.create({
			updated_by: email,
			dish_id: _id,
			old_dish_body: OldDishBody,
			new_dish_body: newDishBody,
			updated_at: new Date()
		});
	}
}

export default new repository;