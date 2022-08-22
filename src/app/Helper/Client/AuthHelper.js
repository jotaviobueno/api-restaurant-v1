// Models
import TokenChangeEmailModel from "../../Models/Client/Log/AuthTokens/TokenChangeEmailModel.js";
import TokensChangePasswordModel from "../../Models/Client/Log/AuthTokens/TokenChangePasswordModel.js";

// Settings
const DeleteTokensWhenHave = 3;

class AuthHelper {

	// 
	// TokenChangeEmailModel
	// 

	async thisEmailChangeTokenExists ( change_token ) {
		const findToken = await TokenChangeEmailModel.findOne({ token: change_token, status: null });

		if ( findToken === null )
			return false;

		return findToken;
	}

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

	async thisPasswordChangeTokenExists ( change_token ) {
		const findToken = await TokensChangePasswordModel.findOne({ token: change_token, status: null });
		console.log(findToken);

		if ( findToken === null )
			return false;

		return findToken;
	}

	async CheckingThePasswordTokenExpirationDate (  ) {
		const findAllTokens = await TokensChangePasswordModel.find({ status: null });

		findAllTokens.forEach( async ( tokens ) => {
			if ( new Date() >= tokens.token_expires_in )
				await TokensChangePasswordModel.findOneAndUpdate({ token: tokens.token }, {status: false });
		});
	}

	async CheckUserPasswordChangeTokenAmount ( email ) {
		const findAllUserToken = await TokensChangePasswordModel.find({ email: email, status: null });

		if ( findAllUserToken.length >= 1 )
			await TokensChangePasswordModel.updateMany({ email: email }, { status: false });

	}

	async DeletingOldPasswordChangeTokens ( email ) {
		const findAllTokens = await TokensChangePasswordModel.find({ email: email, status: false }); 

		if ( findAllTokens.length >= DeleteTokensWhenHave )
			await TokensChangePasswordModel.deleteMany( );
	}

	async deletePasswordChangeToken ( token ) {
		await TokensChangePasswordModel.findOneAndUpdate({ token: token, status: null }, { status: true });
	} 
	
}

export default new AuthHelper;