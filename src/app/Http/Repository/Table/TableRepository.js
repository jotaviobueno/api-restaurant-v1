// Models
import TableModel from "../../../Models/Table/TableModel.js";
import DeletionHistoryModel from "../../../Models/Table/Log/DeletionHistoryModel.js";
import ReserveModel from "../../../Models/Table/ReserveModel.js";

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

	async FindAllTables ( ) {
		return await TableModel.find({ deleted_at: null }).select({ __v: 0, booked_by: { email: 0, name: 0, cpf: 0} });
	}

	async CreateReserveAndDeactivationToken ( name, email, cpf, date, table_id ) {
		
		await TableModel.findOneAndUpdate({ _id: table_id, deleted_at: null }, 
			{ updated_at: new Date(), reserved: true, booked_by: { email: email, name: name, cpf: cpf } });

		return await ReserveModel.create({
			email: email,
			name: name,
			cpf: cpf,
			reserved_in: date,
			expires_in: date.setHours( date.getHours() + 1),
			table_id: table_id,
		});

	}
}

export default new repository;