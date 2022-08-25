// Models
import TableModel from "../../Models/Table/TableModel.js";
import ReserveModel from "../../Models/Table/ReserveModel.js";

class TableHelper {
    
	async existTable ( table_id ) {
		try {
			const findTable = await TableModel.findOne({ _id: table_id, deleted_at: null, reserved: false });

			if ( findTable === null )
				return false;
        
			return findTable;
		} catch (e) {
			return false;
		}
	}

	async verifyDateExpires ( ) {
		const findReserve = await ReserveModel.find();

		findReserve.forEach( async ( reserves ) => {
			
			if ( new Date() >= reserves.expires_in ) {
				await TableModel.findOneAndUpdate({ _id: reserves.table_id }, { booked_by: { email: null, name: null, cpf: null }, 
					reserved: false, 
					updated_at: new Date() 
				});

				await ReserveModel.findOneAndDelete({ table_id: reserves.table_id }, { table_id: reserves.table_id } );
			}
		});
	}

	async HaveReservation ( email ) {
		if ( await ReserveModel.findOne({ email: email }) === null )
			return false;
	}
}

export default new TableHelper;