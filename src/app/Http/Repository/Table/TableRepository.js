// Models
import TableModel from "../../../Models/Table/TableModel.js";

class repository {

	async CreateTable ( created_by ) {
		return await TableModel.create({
			created_by: created_by,
			booked_by: {
				email: null,
				name: null,
				cpf: null,
			},
			reserved: false,
			created_at: new Date(),
			updated_at: new Date(),
			deleted_at: null
		});
	}

	async AmountOfTables ( ) {
		const find = await TableModel.find();

		return find.length;
	}

}

export default new repository;