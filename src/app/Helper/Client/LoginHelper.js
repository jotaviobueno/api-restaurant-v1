// Models
import LoginModel from "../../Models/Client/LoginModel.js";

// Config
const _AmountOfAllowedLogins = 1;

class LoginHelper {

	async checkAmountNumberOfLogins ( email ) {
		const findLogins = await LoginModel.find({ email: email, disconnected_in: null });

		if ( findLogins.length >= _AmountOfAllowedLogins )
			await LoginModel.updateMany({ disconnected_in: new Date() });

	}

	async existToken ( session_token ) {
		const findToken = await LoginModel.findOne({ session_token: session_token, disconnected_in: null });

		if ( findToken === null )
			return false;
        
		return findToken;
	}

	async disconnectAllSessions ( email ) {
		await LoginModel.findOneAndUpdate({ email: email, disconnected_in: null }, { disconnected_in: new Date() });
	}
}

export default new LoginHelper;