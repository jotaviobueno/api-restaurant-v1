// Dependencies
import yup from "yup";

class AuthRequest {

	async ValidateGetTokenChangeEmail ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required()
		});

		const BodyValidator = yup.object().shape({
			password: yup.string().required(),
		});

		try {
			await BodyValidator.validate(req.body);
			await HeadersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

	async ValidateGetTokenToChangePassword ( req, res, next ) {

		const BodyValidator = yup.object().shape({
			email: yup.string().email().required(),
		});

		try {
			await BodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}
}

export default new AuthRequest;