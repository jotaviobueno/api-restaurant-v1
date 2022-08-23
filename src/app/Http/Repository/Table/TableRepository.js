// Models
import TableModel from "../../../Models/Table/TableModel.js";
import DeletionHistoryModel from "../../../Models/Table/Log/DeletionHistoryModel.js";

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

	async deleteTableAndCreateLog ( article_id, email ) {
		await TableModel.findOneAndUpdate({ _id: article_id, deleted_at: null }, { deleted_at: new Date(), updated_at: new Date() });

		return await DeletionHistoryModel.create({
			table_id: article_id,
			deleted_by: email,
			deleted_at: new Date()
		});
	}

}

export default new repository;