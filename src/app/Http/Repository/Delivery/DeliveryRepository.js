// Models
import OrderModel from "../../../Models/Delivery/OrderModel.js";

class repository {

	async CreateOrder ( name, email, card, cvv, date, address, dish_name, dish_body ) {
		return await OrderModel.create({
			dish_id: [ { 
				dish_name: dish_name,
				dish_body: dish_body } ],
			cardInfo: {
				card: card,
				cvv: cvv,
				date: date
			},
			address: address,
			name: name,
			email: email,
			created_at: new Date(),
			deleted_at: null,
			updated_at: new Date(),

		});
	}

	async findAllOrders ( email ) {
		return await OrderModel.find({ email: email, deleted_at: null }).select({ __v: 0, updated_at: 0, deleted_at: 0 });
	}
}

export default new repository;