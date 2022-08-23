// Models
import TableModel from "../../Models/Table/TableModel.js";

class TableHelper {
    
	async existTable ( table_id ) {
		const findTable = await TableModel.findOne({ _id: table_id, deleted_at: null, reserved: false });

		if ( findTable === null )
			return false;
        
		return findTable;
	}

}

export default new TableHelper;