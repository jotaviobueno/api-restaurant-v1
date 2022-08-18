// Models
import ClientModel from "../../Models/Client/ClientModel.js";

// dependencies
import bcrypt from "bcrypt";

class ClientHelper {

	async existEmail ( email ) {
		const findEmail = await ClientModel.findOne({ email: email, deleted_at: null });

		if ( findEmail === null )
			return false;
        
		return findEmail;
	}

	async existCpf ( cpf ) {
		const findCpf = await ClientModel.findOne({ cpf: cpf, deleted_at: null });

		if ( findCpf === null )
			return false;

		return findCpf; 
	}

	async comparePassword ( password, hash ) {
		return await bcrypt.compare( password, hash );
	}
}

export default new ClientHelper;