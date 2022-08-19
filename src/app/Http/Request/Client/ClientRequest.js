// Dependencies
import yup from "yup";

class ClientRequest {

	async ValidateStorage ( req, res, next ) {

		const BodyValidator = yup.object().shape({
			name: yup.string().min(3).max(60).required(),
			email: yup.string().email().required(),
			password: yup.string().min(8).max(16).required(),
			cpf: yup.number().required()
		});

		try {
			await BodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

	async ValidateLoginEmail ( req, res, next ) {

		const BodyValidator = yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().required(),
		});

		try {
			await BodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

	async ValidateLoginCpf ( req, res, next ) {

		const BodyValidator = yup.object().shape({
			cpf: yup.number().required(),
			password: yup.string().required(),
		});

		try {
			await BodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

	async ValidateSeeAccount ( req, res, next ) {
		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required()
		});

		try {
			await HeadersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

	async ValidateDelete ( req, res, next ) {
		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required()
		});

		const BodyValidator = yup.object().shape({
			cpf: yup.number().required(),
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
}

export default new ClientRequest;