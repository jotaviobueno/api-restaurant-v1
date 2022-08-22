// Models
import TokenChangeEmailModel from "../../Models/Client/Log/AuthTokens/TokenChangeEmailModel.js";
import TokensChangePaswordModel from "../../Models/Client/Log/AuthTokens/TokenChangePasswordModel.js";

// Settings
const DeleteTokensWhenHave = 3;

class AuthHelper {

	// 
	// TokenChangeEmailModel
	// 

	async CheckEmailChangeTokenExpirationDate (  ) {
		const findAllTokens = await TokenChangeEmailModel.find({ status: null });

		findAllTokens.forEach( async ( tokens ) => {
			if ( new Date() >= tokens.token_expires_in )
				await TokenChangeEmailModel.findOneAndUpdate({ token: tokens.token }, {status: false });
		});

	}

	async CheckUserEmailChangeTokenAmount ( email ) {
		const findAllUserToken = await TokenChangeEmailModel.find({ email: email, status: null });

		if ( findAllUserToken.length >= 1 )
			await TokenChangeEmailModel.updateMany({ email: email }, { status: false });

	}

	async thisEmailChangeTokenExists ( change_token ) {
		const findToken = await TokenChangeEmailModel.findOne({ token: change_token, status: null });

		if ( findToken === null )
			return false;

		return findToken;
	}

	async DeletingOldEmailChangeTokens ( email ) {
		const findAllTokens = await TokenChangeEmailModel.find({ email: email, status: false }); 

		if ( findAllTokens.length >= DeleteTokensWhenHave )
			await TokenChangeEmailModel.deleteMany( );
	}

	async deleteEmailToken ( token ) {
		await TokenChangeEmailModel.findOneAndUpdate({ token: token, status: null }, { status: true });
	}

	//
	// TokensChangePaswordModel
	// 

	async CheckingThePasswordTokenExpirationDate (  ) {
		const findAllTokens = await TokensChangePaswordModel.find({ status: null });

		findAllTokens.forEach( async ( tokens ) => {
			if ( new Date() >= tokens.token_expires_in )
				await TokensChangePaswordModel.findOneAndUpdate({ token: tokens.token }, {status: false });
		});
	}

	async CheckUserPasswordChangeTokenAmount ( email ) {
		const findAllUserToken = await TokensChangePaswordModel.find({ email: email, status: null });

		if ( findAllUserToken.length >= 1 )
			await TokensChangePaswordModel.updateMany({ email: email }, { status: false });

	}

	async DeletingOldPasswordChangeTokens ( email ) {
		const findAllTokens = await TokensChangePaswordModel.find({ email: email, status: false }); 

		if ( findAllTokens.length >= DeleteTokensWhenHave )
			await TokensChangePaswordModel.deleteMany( );
	}

	async deletePasswordChangeToken ( token ) {
		await TokensChangePaswordModel.findOneAndUpdate({ token: token, status: null }, { status: true });
	} 
	
}

export default new AuthHelper;